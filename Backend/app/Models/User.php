<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens; // ✅ IMPORTANT pour Sanctum

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable, HasApiTokens; // ✅ Ajouter HasApiTokens

    protected $fillable = [
        'name',
        'email',
        'password',
        'is_verified',
        'verification_code',
        'email_verified_at',
        'bio',              // ✅ NOUVEAU
        'campus',           // ✅ NOUVEAU
        'filiere',          // ✅ NOUVEAU
        'graduation_year',  // ✅ NOUVEAU
        'avatar',           // ✅ NOUVEAU
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'verification_code',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

     protected static function boot()
    {
        parent::boot();

        static::deleting(function ($user) {
            // Supprimer toutes les ressources de l'utilisateur
            $user->resources()->delete();
        });
    }

    // ✅ Relations
    public function resources()
    {
        return $this->hasMany(Resource::class);
    }

    public function bookmarkedResources()
    {
        return $this->belongsToMany(Resource::class, 'resource_user_bookmarks')->withTimestamps();
    }

    public function bookmarks()
    {
        return $this->belongsToMany(Resource::class, 'saved_resources');
    }
}