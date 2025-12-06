<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\University;
use App\Models\Student;
use App\Models\Country;

class LandingPageController extends Controller
{
    public function index()
    {
        // Exemple de récupération des statistiques
        $universitiesCount = University::count();
        $studentsCount = Student::count();
        $countriesCount = Country::count();

        // Exemple : calcul d’un taux de satisfaction (fictif)
        $satisfactionRate = 98; 

        return view('welcome', compact('universitiesCount', 'studentsCount', 'countriesCount', 'satisfactionRate'));
    }
}
