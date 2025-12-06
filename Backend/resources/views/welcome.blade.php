{{-- resources/views/uniresource.blade.php --}}

<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="UniResource - University Resource Management Platform">
    <title>UniResource</title>
    @vite('resources/css/app.css')
</head>
<body class="min-h-screen bg-white">

    {{-- HEADER --}}
    <header class="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center space-x-2">
                    <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                        <path d="M4 4h16v16H4z"></path>
                    </svg>
                    <span class="text-xl font-bold text-gray-900">UniResource</span>
                </div>
                <nav class="hidden md:flex items-center space-x-8">
                    <a href="#features" class="text-gray-700 hover:text-blue-600 transition-colors">Services</a>
                    <a href="#universities" class="text-gray-700 hover:text-blue-600 transition-colors">Universities</a>
                    <a href="#about" class="text-gray-700 hover:text-blue-600 transition-colors">About</a>
                    <a href="#contact" class="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
                </nav>
                <div class="flex items-center space-x-4">
                    <a href="{{ route('login') }}" class="text-gray-700 hover:text-blue-600 transition-colors">Log in</a>
                    <a href="{{ route('register') }}" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                        Get Started
                    </a>
                </div>
            </div>
        </div>
    </header>

    {{-- MAIN --}}
    <main class="pt-16">

        {{-- HERO SECTION --}}
        <section class="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20 lg:py-32">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
                <div class="space-y-8">
                    <div class="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                        <span class="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                        <span>Trusted by 500+ Universities</span>
                    </div>
                    <h1 class="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                        Streamline Your University Resource Management
                    </h1>
                    <p class="text-xl text-gray-600 leading-relaxed">
                        A comprehensive platform to manage courses, students, faculty, and resources efficiently.
                        Empower your institution with modern tools for academic excellence.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4">
                        <a href="{{ route('register') }}" class="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2">
                            <span>Start Free Trial</span>
                            <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path d="M9 5l7 7-7 7"></path>
                            </svg>
                        </a>
                        <button class="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-lg font-medium border-2 border-gray-200 transition-colors">
                            Schedule Demo
                        </button>
                    </div>
                </div>
                <div class="relative">
                    <div class="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl shadow-2xl p-8 transform rotate-2">
                        <div class="bg-white rounded-xl shadow-lg transform -rotate-2 p-6 space-y-3">
                            <div class="flex items-center justify-between pb-4 border-b">
                                <div class="flex items-center space-x-3">
                                    <div class="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                                        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                            <path d="M4 4h16v16H4z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <div class="font-semibold text-gray-900">Advanced Mathematics</div>
                                        <div class="text-sm text-gray-600">Spring 2025</div>
                                    </div>
                                </div>
                            </div>
                            <div class="space-y-3">
                                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <span class="text-sm text-gray-700">Enrolled Students</span>
                                    <span class="font-semibold text-gray-900">156</span>
                                </div>
                                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <span class="text-sm text-gray-700">Completion Rate</span>
                                    <span class="font-semibold text-green-600">94%</span>
                                </div>
                                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <span class="text-sm text-gray-700">Resources Available</span>
                                    <span class="font-semibold text-gray-900">48</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {{-- SERVICES SECTION --}}
        <section id="features" class="py-20 lg:py-28 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Comprehensive Services</h2>
                    <p class="text-xl text-gray-600 max-w-2xl mx-auto">
                        Designed to meet all your university resource management needs
                    </p>
                </div>
                <div class="grid md:grid-cols-3 gap-8">
                    <div class="p-8 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all">
                        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path d="M12 6V2m0 4a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"></path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-semibold text-gray-900 mb-3">Course Management</h3>
                        <p class="text-gray-600">
                            Organize and manage courses, syllabi, schedules, and course materials in one centralized platform.
                        </p>
                    </div>

                    <div class="p-8 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all">
                        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path d="M17 20h5v-2a3 3 0 0 0-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 0 1 5.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 0 1 9.288 0M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-semibold text-gray-900 mb-3">Student Management</h3>
                        <p class="text-gray-600">
                            Track student enrollment, grades, attendance, and academic progress with real-time analytics.
                        </p>
                    </div>

                    <div class="p-8 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all">
                        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"></path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-semibold text-gray-900 mb-3">Resource Scheduling</h3>
                        <p class="text-gray-600">
                            Efficiently schedule classrooms, labs, equipment, and facilities to optimize space utilization.
                        </p>
                    </div>

                    <div class="p-8 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all">
                        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path d="M9 19v-6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2zm0 0V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v10m-6 0a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2m0 0V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z"></path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-semibold text-gray-900 mb-3">Analytics & Reports</h3>
                        <p class="text-gray-600">
                            Generate detailed reports and gain insights into academic performance and resource utilization.
                        </p>
                    </div>

                    <div class="p-8 rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all">
                        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path d="M12 15v2m-6 4h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2zm10-10V7a4 4 0 0 0-8 0v4h8z"></path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-semibold text-gray-900 mb-3">Security & Compliance</h3>
                        <p class="text-gray-600">
                            Enterprise-grade security with role-based access control and full compliance with data regulations.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {{-- ABOUT SECTION --}}
        <section id="about" class="py-20 lg:py-28 bg-gray-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid lg:grid-cols-2 gap-12 items-center">
                    <div class="space-y-8">
                        <div>
                            <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">About UniResource</h2>
                            <p class="text-xl text-gray-600 leading-relaxed">
                                UniResource is a leading provider of comprehensive resource management solutions for universities worldwide. Since our founding in 2015, we've been committed to empowering educational institutions with innovative technology.
                            </p>
                        </div>
                        <div class="space-y-4">
                            <div class="flex items-start space-x-4">
                                <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                        <path d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="font-semibold text-gray-900">Proven Track Record</h3>
                                    <p class="text-gray-600">Serving 500+ universities across 50+ countries</p>
                                </div>
                            </div>
                            <div class="flex items-start space-x-4">
                                <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                        <path d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="font-semibold text-gray-900">Expert Team</h3>
                                    <p class="text-gray-600">300+ professionals dedicated to your success</p>
                                </div>
                            </div>
                            <div class="flex items-start space-x-4">
                                <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                        <path d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="font-semibold text-gray-900">Innovation First</h3>
                                    <p class="text-gray-600">Continuously improving with latest technology</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-8 text-white">
                        <h3 class="text-2xl font-bold mb-8">Our Commitment</h3>
                        <div class="space-y-6">
                            <div class="pb-6 border-b border-blue-400">
                                <h4 class="text-lg font-semibold mb-2">Educational Excellence</h4>
                                <p class="text-blue-100">We're dedicated to providing tools that enhance academic quality and student success.</p>
                            </div>
                            <div class="pb-6 border-b border-blue-400">
                                <h4 class="text-lg font-semibold mb-2">Digital Transformation</h4>
                                <p class="text-blue-100">Helping universities embrace modern technology to improve operations and learning outcomes.</p>
                            </div>
                            <div>
                                <h4 class="text-lg font-semibold mb-2">Sustainable Growth</h4>
                                <p class="text-blue-100">Supporting institutions in their digital journey while maintaining focus on their core mission.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {{-- UNIVERSITIES STATISTICS --}}
        <section id="universities" class="py-20 lg:py-28 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Trusted by Leading Universities</h2>
                    <p class="text-xl text-gray-600 max-w-2xl mx-auto">
                        Join hundreds of prestigious institutions worldwide
                    </p>
                </div>

                <div class="grid md:grid-cols-4 gap-8 mb-16">
                    <div class="text-center p-6 rounded-xl bg-gray-50">
                        <div class="text-4xl font-bold text-blue-600 mb-2">{{ $universitiesCount }}</div>
                        <p class="text-gray-700 font-medium">Universities</p>
                    </div>
                    <div class="text-center p-6 rounded-xl bg-gray-50">
                        <div class="text-4xl font-bold text-blue-600 mb-2">{{ $studentsCount }}</div>
                        <p class="text-gray-700 font-medium">Active Students</p>
                    </div>
                    <div class="text-center p-6 rounded-xl bg-gray-50">
                        <div class="text-4xl font-bold text-blue-600 mb-2">{{ $countriesCount }}</div>
                        <p class="text-gray-700 font-medium">Countries</p>
                    </div>
                    <div class="text-center p-6 rounded-xl bg-gray-50">
                        <div class="text-4xl font-bold text-blue-600 mb-2">{{ $satisfactionRate }}%</div>
                        <p class="text-gray-700 font-medium">Satisfaction Rate</p>
                    </div>
                </div>

                <div class="bg-gradient-to-r from-blue-50 to-gray-50 rounded-2xl p-12 text-center">
                    <h3 class="text-2xl font-bold text-gray-900 mb-4">Partner with UniResource Today</h3>
                    <p class="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Join the community of universities that have transformed their resource management and improved operational efficiency.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="{{ route('register') }}" class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                            Request a Demo
                        </a>
                        <button class="bg-white hover:bg-gray-50 text-gray-900 px-8 py-3 rounded-lg font-medium border-2 border-gray-200 transition-colors">
                            Download Case Study
                        </button>
                    </div>
                </div>
            </div>
        </section>

        {{-- CONTACT SECTION --}}
        <section id="contact" class="py-20 lg:py-28 bg-gray-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Get in Touch</h2>
                    <p class="text-xl text-gray-600 max-w-2xl mx-auto">
                        Have questions? Our team is ready to help.
                    </p>
                </div>

                <div class="grid md:grid-cols-3 gap-8 mb-12">
                    <div class="text-center">
                        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"></path>
                            </svg>
                        </div>
                        <h3 class="font-semibold text-gray-900 mb-2">Email</h3>
                        <p class="text-gray-600">support@uniresource.com</p>
                    </div>

                    <div class="text-center">
                        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path d="M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .948.684l1.498 4.493a1 1 0 0 1-.502 1.21l-2.257 1.13a11.042 11.042 0 0 0 5.516 5.516l1.13-2.257a1 1 0 0 1 1.21-.502l4.493 1.498a1 1 0 0 1 .684.949V19a2 2 0 0 1-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                            </svg>
                        </div>
                        <h3 class="font-semibold text-gray-900 mb-2">Phone</h3>
                        <p class="text-gray-600">+1 (555) 123-4567</p>
                    </div>

                    <div class="text-center">
                        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1-2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z"></path>
                                <path d="M15 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
                            </svg>
                        </div>
                        <h3 class="font-semibold text-gray-900 mb-2">Office</h3>
                        <p class="text-gray-600">123 Education Blvd, Tech City</p>
                    </div>
                </div>

                <div class="bg-white rounded-xl border border-gray-200 p-8">
                    <form class="space-y-6">
                        <div class="grid md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-medium text-gray-900 mb-2">Full Name</label>
                                <input type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="John Doe">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-900 mb-2">Email</label>
                                <input type="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="john@university.edu">
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-900 mb-2">University</label>
                            <input type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your University Name">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-900 mb-2">Message</label>
                            <textarea class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" rows="5" placeholder="Tell us about your needs..."></textarea>
                        </div>
                        <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>

    </main>

    {{-- FOOTER --}}
    <footer class="bg-gray-900 text-gray-400 py-12 mt-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-4 gap-8 mb-8">
                <div>
                    <div class="flex items-center space-x-2 mb-4">
                        <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                            <path d="M4 4h16v16H4z"></path>
                        </svg>
                        <span class="text-lg font-bold text-white">UniResource</span>
                    </div>
                    <p class="text-sm leading-relaxed">
                        Empowering universities with modern resource management solutions.
                    </p>
                </div>

                <div>
                    <h3 class="text-white font-semibold mb-4">Product</h3>
                    <ul class="space-y-2 text-sm">
                        <li><a href="#" class="hover:text-white">Features</a></li>
                        <li><a href="#" class="hover:text-white">Pricing</a></li>
                        <li><a href="#" class="hover:text-white">Security</a></li>
                        <li><a href="#" class="hover:text-white">Updates</a></li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-white font-semibold mb-4">Company</h3>
                    <ul class="space-y-2 text-sm">
                        <li><a href="#" class="hover:text-white">About</a></li>
                        <li><a href="#" class="hover:text-white">Careers</a></li>
                        <li><a href="#" class="hover:text-white">Blog</a></li>
                        <li><a href="#" class="hover:text-white">Contact</a></li>
                    </ul>
                </div>

                <div>
                    <h3 class="text-white font-semibold mb-4">Support</h3>
                    <ul class="space-y-2 text-sm">
                        <li><a href="#" class="hover:text-white">Help Center</a></li>
                        <li><a href="#" class="hover:text-white">Documentation</a></li>
                        <li><a href="#" class="hover:text-white">API Reference</a></li>
                        <li><a href="#" class="hover:text-white">Community</a></li>
                    </ul>
                </div>
            </div>

            <div class="border-t border-gray-800 pt-8 text-sm text-center">
                <p>&copy; 2025 UniResource. All rights reserved.</p>
            </div>
        </div>
    </footer>
    <button onclick="window.scrollTo({ top: 0, behavior: 'smooth' })"
    class="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700">
    ↑
</button>


</body>
</html>
