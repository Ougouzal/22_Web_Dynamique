<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ResourceController;
use Illuminate\Http\Request;
use App\Models\Resource; // si tu as un modèle Resource
use App\Http\Controllers\Auth\AuthenticatedSessionController;


// Routes publiques
Route::get('/resources', [ResourceController::class, 'index']);

// Routes protégées (requièrent un utilisateur connecté)

Route::post('/resources', [ResourceController::class, 'store']);
Route::post('resources/{id}/increment-views', [ResourceController::class, 'incrementViews']);
Route::post('/resources/{id}/like', [ResourceController::class, 'likeResource']);
Route::post('/resources/{id}/bookmark', [ResourceController::class, 'bookmarkResource']);
// Route::post('/resources/{id}/bookmark', [ResourceController::class, 'toggleBookmark']);




// Route::get('/me', function (\Illuminate\Http\Request $request) {
//     return response()->json([
//         'authenticated' => auth()->check(),
//         'user' => auth()->user()
//     ]);
// });

use App\Http\Controllers\SimpleAuthController;

Route::post('/register', [SimpleAuthController::class, 'register']);
Route::post('/login', [SimpleAuthController::class, 'login']);
Route::post('/logout', [SimpleAuthController::class, 'logout']);
Route::get('/me', [SimpleAuthController::class, 'me']);
Route::post('/verify-email', [SimpleAuthController::class, 'verifyEmail']);

Route::get('/users', [SimpleAuthController::class, 'getAllUsers']);
// Supprimer le compte de l'utilisateur connecté
// Route::delete('/users/{id}', [SimpleAuthController::class, 'destroy'])
//     ->middleware('auth:sanctum');

Route::delete('/users/{id}', [SimpleAuthController::class, 'destroy']);
Route::post('/change-password', [SimpleAuthController::class, 'changePassword']);
Route::post('/upload-profile-picture', [SimpleAuthController::class, 'uploadProfilePicture']);
Route::post('/update-academic-info', [SimpleAuthController::class, 'updateAcademicInfo']);
Route::post('/update-personal-info', [SimpleAuthController::class, 'updatePersonalInfo']);
Route::post('/contact-support', [SimpleAuthController::class, 'contactSupport']);


Route::get('/user', function () {
    return auth()->user();
})->middleware('auth:sanctum');







// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return response()->json([
//         'success' => true,
//         'user' => [
//             'id' => $request->user()->id,
//             'name' => $request->user()->name,
//             'email' => $request->user()->email,
//         ]
//     ]);
// });

// Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
//     ->middleware('auth:sanctum');


// Route::post('/login', [AuthenticatedSessionController::class, 'store']);
// Route::post('/register', [RegisteredUserController::class, 'store']);


Route::get('/saved', function () {
    try {
        $userId = auth()->id(); // ID de l'utilisateur connecté

        // Récupérer uniquement les ressources bookmarkées
        $resources = \App\Models\Resource::whereJsonContains('bookmarked_by', $userId)
            ->orderBy('created_at', 'desc')
            ->get();

        // Ajouter les champs nécessaires pour ton front
        foreach ($resources as $resource) {
            $likedBy = $resource->liked_by ? json_decode($resource->liked_by, true) : [];
            $bookmarkedBy = $resource->bookmarked_by ? json_decode($resource->bookmarked_by, true) : [];

            $resource->isLiked = in_array($userId, $likedBy);
            $resource->isBookmarked = in_array($userId, $bookmarkedBy);
            $resource->tags = $resource->tags ? json_decode($resource->tags, true) : [];
        }

        return response()->json([
            'success' => true,
            'data' => $resources
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'error' => $e->getMessage()
        ], 500);
    }
});
