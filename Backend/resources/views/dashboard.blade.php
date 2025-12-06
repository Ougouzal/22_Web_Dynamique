<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">

                    {{-- ✅ Message commun --}}
                    {{ __("You're logged in!") }}

                    {{-- ✅ Vérifier le rôle de l'utilisateur connecté --}}
                    @if (Auth::user()->role === 'admin')
                        <div class="mt-4 p-4 bg-blue-100 text-blue-800 rounded-lg">
                            👑 Bonjour {{ Auth::user()->name }}, vous êtes connecté en tant qu’<strong>ADMIN</strong>.
                        </div>
                    @else
                        <div class="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
                            👋 Bonjour {{ Auth::user()->name }}, vous êtes connecté en tant qu’<strong>utilisateur normal</strong>.
                        </div>
                    @endif

                </div>
            </div>
        </div>
    </div>
</x-app-layout>
