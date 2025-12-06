<?php

namespace App\Http\Controllers;

use App\Models\Resource;
use Illuminate\Http\Request;

class ResourceController extends Controller
{
    /**
     * LISTE DES RESSOURCES
     */
public function index()
{
    try {
        $userId = auth()->id();

        $resources = Resource::orderBy('created_at', 'desc')->paginate(12);

        foreach ($resources as $resource) {

            // Liked_by
            $likedBy = json_decode($resource->liked_by, true);
            if (!is_array($likedBy)) $likedBy = [];

            // Bookmarked_by
            $bookmarkedBy = json_decode($resource->bookmarked_by, true);
            if (!is_array($bookmarkedBy)) $bookmarkedBy = [];

            // Tags
            $tags = json_decode($resource->tags, true);
            if (!is_array($tags)) $tags = [];

            // Champs pour React
            $resource->isLiked = $userId ? in_array($userId, $likedBy) : false;
            $resource->isBookmarked = $userId ? in_array($userId, $bookmarkedBy) : false;

            // Contourner problème : NE PAS ÉCRASER $resource->tags
            $resource->tags_list = $tags;

            // sécurité
            $resource->likes = $resource->likes ?? 0;
        }

        return response()->json([
            'success' => true,
            'data' => $resources
        ]);

    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'error' => $e->getMessage(),
        ], 500);
    }
}



    /**
     * AJOUT D'UNE RESSOURCE
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'driveLink' => 'required|url',
            'resourceType' => 'required|string',
        ]);

        $resource = Resource::create($request->all());

        return response()->json([
            'success' => true,
            'data' => $resource
        ]);
    }

    /**
     * INCRÉMENTER LES VUES
     */
    public function incrementViews($id)
    {
        $resource = Resource::find($id);

        if (!$resource) {
            return response()->json(['success' => false, 'message' => 'Resource not found'], 404);
        }

        $resource->views += 1;
        $resource->save();

        return response()->json([
            'success' => true,
            'views' => $resource->views
        ]);
    }

    /**
     * LIKE / UNLIKE
     */
    public function likeResource($id)
    {
        $resource = Resource::findOrFail($id);
        $userId = auth()->id(); // l'utilisateur connecté // En attendant ton AuthContext

        $likedBy = $resource->liked_by ? json_decode($resource->liked_by, true) : [];

        if (in_array($userId, $likedBy)) {
            // retirer like
            $likedBy = array_diff($likedBy, [$userId]);
            $resource->likes = max(0, $resource->likes - 1);
            $isLiked = false;
        } else {
            // ajouter like
            $likedBy[] = $userId;
            $resource->likes += 1;
            $isLiked = true;
        }

        $resource->liked_by = json_encode(array_values($likedBy));
        $resource->save();

        return response()->json([
            'success' => true,
            'likes' => $resource->likes,
            'isLiked' => $isLiked
        ]);
    }

    /**
     * BOOKMARK / UNBOOKMARK
     */
    public function bookmarkResource($id)
    {
        $resource = Resource::findOrFail($id);
        $userId = auth()->id(); // l'utilisateur connecté

        $bookmarkedBy = $resource->bookmarked_by ? json_decode($resource->bookmarked_by, true) : [];

        if (in_array($userId, $bookmarkedBy)) {
            $bookmarkedBy = array_diff($bookmarkedBy, [$userId]);
            $isBookmarked = false;
        } else {
            $bookmarkedBy[] = $userId;
            $isBookmarked = true;
        }

        $resource->bookmarked_by = json_encode(array_values($bookmarkedBy));
        $resource->save();

        return response()->json([
            'success' => true,
            'isBookmarked' => $isBookmarked
        ]);
    }

//     public function toggleBookmark($id)
// {
//     $resource = Resource::findOrFail($id);

//     $user = auth()->user();

//     if ($user->bookmarks()->where('resource_id', $id)->exists()) {
//         $user->bookmarks()->detach($id);
//         return response()->json(['bookmarked' => false]);
//     }

//     $user->bookmarks()->attach($id);
//     return response()->json(['bookmarked' => true]);
// }

}
