<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;

class SimpleAuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            $request->validate([
                "name" => "required|string|max:255",
                "email" => "required|email|unique:users,email",
                "password" => "required|min:5",
            ]);

            // Générer code à 6 chiffres
            $code = (string) random_int(100000, 999999);

            $user = User::create([
                "name" => $request->name,
                "email" => $request->email,
                "password" => Hash::make($request->password),
                "is_verified" => false,
                "verification_code" => $code,
            ]);

            // Envoi email
            Mail::raw("Votre code de vérification est : $code", function ($message) use ($user) {
                $message->to($user->email)
                    ->subject("Vérification de votre compte");
            });

            return response()->json([
                "success" => true,
                "message" => "Utilisateur créé. Vérifiez votre email.",
                "userId" => (string) $user->id // S'assurer que c'est une string
            ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                "success" => false,
                "message" => "Erreur de validation",
                "errors" => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                "success" => false,
                "message" => "Erreur serveur: " . $e->getMessage()
            ], 500);
        }
    }

    public function verifyEmail(Request $request)
    {
        // 🔍 LOG : Voir ce qui arrive au backend
        Log::info('===== VERIFICATION EMAIL =====');
        Log::info('Toutes les données reçues:', $request->all());
        Log::info('userId reçu:', ['userId' => $request->input('userId')]);
        Log::info('code reçu:', ['code' => $request->input('code')]);
        
        try {
            // Validation avec messages personnalisés
            $validated = $request->validate([
                "userId" => "required|exists:users,id",
                "code" => "required|string|size:6"
            ], [
                'userId.required' => 'ID utilisateur requis',
                'userId.exists' => 'Utilisateur non trouvé',
                'code.required' => 'Code de vérification requis',
                'code.size' => 'Le code doit contenir 6 chiffres'
            ]);

            Log::info('✅ Validation passée:', $validated);

            $user = User::find($validated['userId']);

            if (!$user) {
                Log::error('❌ Utilisateur non trouvé après validation');
                return response()->json([
                    "success" => false, 
                    "message" => "Utilisateur non trouvé"
                ], 404);
            }

            Log::info('User trouvé:', [
                'id' => $user->id,
                'email' => $user->email,
                'is_verified' => $user->is_verified,
                'verification_code' => $user->verification_code
            ]);

            // Vérifier si déjà vérifié
            if ($user->is_verified) {
                return response()->json([
                    "success" => false,
                    "message" => "Email déjà vérifié"
                ], 400);
            }

            // Vérifier le code
            if ($user->verification_code !== $validated['code']) {
                Log::warning('❌ Code incorrect', [
                    'attendu' => $user->verification_code,
                    'reçu' => $validated['code']
                ]);
                return response()->json([
                    "success" => false, 
                    "message" => "Code incorrect. Veuillez réessayer."
                ], 400);
            }

            // Vérification réussie
            $user->is_verified = true;
            $user->verification_code = null;
            $user->email_verified_at = now();
            $user->save();

            Log::info('✅ Email vérifié avec succès pour user ID: ' . $user->id);

            return response()->json([
                "success" => true, 
                "message" => "Email vérifié avec succès !"
            ], 200);

        } catch (ValidationException $e) {
            Log::error('❌ Erreur de validation:', $e->errors());
            return response()->json([
                "success" => false,
                "message" => "Données invalides",
                "errors" => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('❌ Exception:', ['message' => $e->getMessage()]);
            return response()->json([
                "success" => false,
                "message" => "Erreur serveur: " . $e->getMessage()
            ], 500);
        }
    }

    public function login(Request $request)
    {
        try {
            $request->validate([
                "email" => "required|email",
                "password" => "required"
            ]);

            if (!Auth::attempt($request->only("email", "password"))) {
                return response()->json([
                    "success" => false,
                    "message" => "Email ou mot de passe incorrect"
                ], 401);
            }

            $user = Auth::user();

            // Bloquer si email non vérifié
            if (!$user->is_verified) {
                Auth::logout();
                return response()->json([
                    "success" => false,
                    "message" => "Veuillez vérifier votre email avant de vous connecter.",
                    "userId" => (string) $user->id
                ], 403);
            }

            return response()->json([
                "success" => true, 
                "message" => "Connexion réussie",
                "user" => $user
            ], 200);

        } catch (ValidationException $e) {
            return response()->json([
                "success" => false,
                "message" => "Données invalides",
                "errors" => $e->errors()
            ], 422);
        }
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            "success" => true, 
            "message" => "Déconnexion réussie"
        ], 200);
    }

    public function getAllUsers()
{
    try {
        $users = User::select('id', 'name', 'email', 'is_verified', 'email_verified_at', 'created_at','profile_picture')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            "success" => true,
            "count" => $users->count(),
            "users" => $users
        ], 200);

    } catch (\Exception $e) {
        Log::error('Erreur récupération users:', ['message' => $e->getMessage()]);
        return response()->json([
            "success" => false,
            "message" => "Erreur lors de la récupération des utilisateurs"
        ], 500);
    }
}

// public function deleteUser($id)
// {
//     try {
//         // Vérifier que l'utilisateur existe
//         $user = User::find($id);

//         if (!$user) {
//             return response()->json([
//                 "success" => false,
//                 "message" => "Utilisateur non trouvé"
//             ], 404);
//         }

//         // Vérifier que c'est bien l'utilisateur connecté qui supprime son propre compte
//         if (Auth::id() !== $user->id) {
//             return response()->json([
//                 "success" => false,
//                 "message" => "Non autorisé"
//             ], 403);
//         }

//         // Supprimer l'utilisateur
//         $user->delete();

//         // Déconnecter l'utilisateur
//         Auth::logout();

//         Log::info('Utilisateur supprimé:', ['id' => $id]);

//         return response()->json([
//             "success" => true,
//             "message" => "Compte supprimé avec succès"
//         ], 200);

//     } catch (\Exception $e) {
//         Log::error('Erreur suppression user:', ['message' => $e->getMessage()]);
//         return response()->json([
//             "success" => false,
//             "message" => "Erreur lors de la suppression: " . $e->getMessage()
//         ], 500);
//     }
// }

    public function me()
    {
        return response()->json([
            "authenticated" => Auth::check(),
            "user" => Auth::user()
        ]);
    }

public function destroy($id)
{
    try {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                "success" => false,
                "message" => "Utilisateur non trouvé"
            ], 404);
        }

        // 🔥 Supprimer d'abord toutes les ressources de l'utilisateur
        \App\Models\Resource::where('user_id', $id)->delete();

        // Puis supprimer l'utilisateur
        $user->delete();

        return response()->json([
            "success" => true,
            "message" => "Compte supprimé avec succès."
        ]);

    } catch (\Exception $e) {
        Log::error('Erreur suppression user:', ['message' => $e->getMessage()]);
        
        return response()->json([
            "success" => false,
            "message" => "Erreur: " . $e->getMessage()
        ], 500);
    }
}

public function changePassword(Request $request)
{
    try {
        $request->validate([
            'userId' => 'required|exists:users,id',
            'currentPassword' => 'required',
            'newPassword' => 'required|min:5',
            'confirmPassword' => 'required|same:newPassword'
        ]);

        $user = User::find($request->userId);

        // Vérifier l'ancien mot de passe
        if (!Hash::check($request->currentPassword, $user->password)) {
            return response()->json([
                "success" => false,
                "message" => "Mot de passe actuel incorrect"
            ], 400);
        }

        // Mettre à jour le mot de passe
        $user->password = Hash::make($request->newPassword);
        $user->save();

        return response()->json([
            "success" => true,
            "message" => "Mot de passe modifié avec succès"
        ]);

    } catch (\Exception $e) {
        return response()->json([
            "success" => false,
            "message" => "Erreur: " . $e->getMessage()
        ], 500);
    }
}

public function uploadProfilePicture(Request $request)
{
    try {
        $request->validate([
            'userId' => 'required|exists:users,id',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:5120' // 5MB max
        ]);

        $user = User::find($request->userId);

        if ($request->hasFile('image')) {
            // Supprimer l'ancienne image si elle existe
            if ($user->profile_picture && file_exists(public_path($user->profile_picture))) {
                unlink(public_path($user->profile_picture));
            }

            // Upload la nouvelle image
            $image = $request->file('image');
            $imageName = time() . '_' . $user->id . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('uploads/profiles'), $imageName);

            // Sauvegarder le chemin dans la base de données
            $user->profile_picture = 'uploads/profiles/' . $imageName;
            $user->save();

            return response()->json([
                "success" => true,
                "message" => "Photo de profil mise à jour",
                "profile_picture" => $user->profile_picture,
                "user" => $user
            ]);
        }

        return response()->json([
            "success" => false,
            "message" => "Aucune image fournie"
        ], 400);

    } catch (\Exception $e) {
        return response()->json([
            "success" => false,
            "message" => "Erreur: " . $e->getMessage()
        ], 500);
    }
}

public function updateAcademicInfo(Request $request)
{
    try {
        $request->validate([
            'userId' => 'required|exists:users,id',
            'campus' => 'nullable|string|max:255',
            'filiere' => 'nullable|string|max:255',
            'graduation_year' => 'nullable|integer|min:2020|max:2030'
        ]);

        $user = User::find($request->userId);

        $user->campus = $request->campus;
        $user->filiere = $request->filiere;
        $user->graduation_year = $request->graduation_year;
        $user->save();

        return response()->json([
            "success" => true,
            "message" => "Informations académiques mises à jour",
            "user" => $user
        ]);

    } catch (\Exception $e) {
        return response()->json([
            "success" => false,
            "message" => "Erreur: " . $e->getMessage()
        ], 500);
    }
}


public function updatePersonalInfo(Request $request)
{
    try {
        $request->validate([
            'userId' => 'required|exists:users,id',
            'name' => 'required|string|max:255',
            'bio' => 'nullable|string|max:500'
        ]);

        $user = User::find($request->userId);

        $user->name = $request->name;
        $user->bio = $request->bio;
        $user->save();

        return response()->json([
            "success" => true,
            "message" => "Informations personnelles mises à jour",
            "user" => $user
        ]);

    } catch (\Exception $e) {
        return response()->json([
            "success" => false,
            "message" => "Erreur: " . $e->getMessage()
        ], 500);
    }
}

}