<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Resource extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'driveLink',
        'description',
        'resourceType',
        'filiere',
        'module',
        'semester',
        'academicYear',
        'campus',
        'tags',
        'likes',
        'views'
    ];

    protected $casts = [
        'tags' => 'array',
    ];
    

    // public function bookmarkedBy()
    // {
    //     return $this->belongsToMany(User::class, 'resource_user_bookmarks')
    //                 ->withTimestamps();
    // }

    
}
