var documenterSearchIndex = {"docs":
[{"location":"#Dokumentation-Numerikpraktikum","page":"Home","title":"Dokumentation Numerikpraktikum","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"In diesem Julia-Programm wird das in [1] beschriebene Finite-Differenzen Schema implementiert und mit einem expliziten Schema verglichen.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Die Nichtlinear Schrödingergleichung (NLS) ist eine partielle Differentialgleichung deren Lösung u(xt) mathbbR times mathbbR to mathbbC die Gleichung ","category":"page"},{"location":"","page":"Home","title":"Home","text":"i u_t - u_xx + lambda u^2 u = 0 \nu(x0) = phi(x)","category":"page"},{"location":"","page":"Home","title":"Home","text":"erfüllt. Dabei ist i = sqrt-1 und die Ableitungen sind als Index geschrieben. Dabei ist lambda ein reeler Parameter und phi mathbbR to mathbbR eine gegebene Funktion.","category":"page"},{"location":"#Mathematischer-Hintergrund","page":"Home","title":"Mathematischer Hintergrund","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Lösungen der NLS erhalten dabei die zwei Größen:","category":"page"},{"location":"","page":"Home","title":"Home","text":"int_mathbbR u^2  dx = const\nint_mathbbR left(frac12u_x^2 + fraclambda4u^4right) dx = const","category":"page"},{"location":"","page":"Home","title":"Home","text":"In [1] wird ein Finites Differenzenschema angegeben, dass diese beiden Größen erhält und welches implementiert wird. Allerdings wird in diesem Paper nicht die Konvergenz des Schemas gezeigt und numerisch kann dies auch nicht beobachtet werden. Allerdings erhält es die beiden oben genannten Größen.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Eine Lösung zum Testen ist gegeben mit","category":"page"},{"location":"","page":"Home","title":"Home","text":"u(xt) = frac32expleft(i(2x - frac74t)right) sechleft(frac32(x+5) - 6tright)","category":"page"},{"location":"","page":"Home","title":"Home","text":"Das Schema in [1] wird verglichen mit dem expliziten Schema","category":"page"},{"location":"","page":"Home","title":"Home","text":"fraciDelta t(U^k+1 - U^k) - frac1Delta x^2AU^k + F_k(U^k) = 0","category":"page"},{"location":"","page":"Home","title":"Home","text":"mit A als Finite-Differenzen Matrix für die zweite Ableitung und U^k als Approximation im k-ten Zeitschritt. Die Funktion F ist gegeben durch","category":"page"},{"location":"","page":"Home","title":"Home","text":"(F_k(U)))_j = fraclambda4(U_j^2 + U_j^k^2)(U_j + U_j^k)","category":"page"},{"location":"","page":"Home","title":"Home","text":"mit j als Index für den Vektor.","category":"page"},{"location":"#Code-Dokumentation","page":"Home","title":"Code Dokumentation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Modules = [NLS]","category":"page"},{"location":"#Main.NLS.first_conservation-Tuple{Matrix{ComplexF64}}","page":"Home","title":"Main.NLS.first_conservation","text":"first_conservation(U::AbstractMatrix{<:Complex})\n\nCompute the first conserved quantity of the NLS-equation.\n\nDescription\n\nThis function calculates the first integral, the first integral is given by\n\nint u^2  dx\n\nIt assumes:\n\nRows of U represent the spatial variable.\nColumns of U represent the temporal variable.\n\nThe function computes:\n\nThe first integral as the sum of squared magnitudes (norm) of the solution matrix U for each time step.\nThe maximum and minimum values of the integral across the spatial domain.\nThe dissipation, defined as the difference between the maximum and minimum values.\n\nArguments\n\nU::AbstractMatrix{<:Complex}: A complex-valued matrix where rows represent spatial variables and columns represent temporal variables.\n\nReturns\n\nA tuple with the following values:\n\nfirst_integral::Vector{Float64}: The computed first integral for each time step.\nmaximal_value::Float64: The maximum value of the first integral.\nminimal_value::Float64: The minimum value of the first integral.\ndissipation::Float64: The difference between the maximum and minimum values (indicating dissipation).\n\nExample\n\n# Example usage\nU = rand(ComplexF64, 100, 10)  # Random complex-valued matrix with 100 spatial points and 10 time steps\n\nfirst_integral, max_val, min_val, dissipation = first_conservation(U)\n\nprintln(\"First integral: \", first_integral)\nprintln(\"Maximum value: \", max_val)\nprintln(\"Minimum value: \", min_val)\nprintln(\"Dissipation: \", dissipation)\n\n\n\n\n\n","category":"method"},{"location":"#Main.NLS.schroedingereq-Tuple{Function, Any, Any}","page":"Home","title":"Main.NLS.schroedingereq","text":"schroedingereq(init_val::Function, dx::Real, dt::Real; lambda::Real = -2, epsilon::Real = 1e-7, T::Real = 6.0) -> Matrix{ComplexF64}\n\nSolve the non-linear Schrödinger equation using the finite-difference method described in  \"Finite-Difference Solutions of a Non-linear Schrödinger Equation\" by Delfour, Fortin, and Payre (1981) [1].\n\nThis function implements a Crank-Nicolson time-stepping scheme combined with a fixed-point iteration  to handle the non-linearity in the Schrödinger equation.\n\nMathematical Context\n\nThe Schrödinger equation with non-linearity can be written as:\n\ni u_t + u_xx + lambda u^2 u = 0\n\nwith \n\nu as the function to solve\ni the imaginary unit with i^2 = -1\nx as the spatial variable\nt as the time variable\n\\lambda as an equation parameter\n\nThe function discretizes the spatial domain with a step size dx and the time      domain with a step size dt. It uses a fixed-point iteration to approximate     the non-linear term at each time step.\n\nThe spatial domain is fixed with the interval (-30, 30).\n\nArguments\n\ninit_val : Function : Function which computes the initial values\ndx : Real : mesh size in the spatial variable\ndt : Real : time step size\n\nKeyword Arguments\n\nlambda : Real Parameter of the NLS-Equation, default = -2.0\nepsilon : Real Error threshold for the fix point iteration, default = 1e-7\nT : Real Total simulation time, default = 6.0\n\nReturns\n\nU : Matrix{ComplexF64} : The rows correspond to the spatial value and the columns correspond to the time values\n\nReferences# References\n\n[1] M. Delfour, M. Fortin, G. Payre: Finite Difference Solutions of a Non-linear Schrödinger equation. Journal of Computational Physics 44, 277-288 (1981)\n\n\n\n\n\n","category":"method"},{"location":"#Main.NLS.second_conservation-Tuple{Matrix{ComplexF64}, Real, Real}","page":"Home","title":"Main.NLS.second_conservation","text":"second_conservation(U::AbstractMatrix{<:Complex}, dx::Real; lambda::Real = -2)\n\nCompute the second conserved quantity for a numerical solution of the NLS-equation. The second conserved quantity is given by:\n\nint frac12 u^2 + fraclambda4u^4  dx\n\nDescription\n\nThis function calculates the second integral, which typically corresponds to the energy-like conservation quantity in numerical schemes, assuming that:\n\nRows of U represent the spatial variable.\nColumns of U represent the temporal variable.\n\nThe function ensures the spatial step size dx is positive. It computes:\n\nThe second integral as a discrete analogue of the integral.\nThe maximum and minimum values of the integral across the temporal domain.\nThe dissipation, defined as the difference between the maximum and minimum values.\n\nArguments\n\nU::AbstractMatrix{<:Complex}: A complex-valued matrix where rows represent spatial variables and columns represent temporal variables.\ndx::Real: The spatial step size. Must be a positive real number.\nlambda::Real : Parameter of the NLS\n\nReturns\n\nA tuple with the following values:\n\nsecond_integral::Vector{Float64}: The computed second integral for each time step.\nmaximal_value::Float64: The maximum value of the second integral.\nminimal_value::Float64: The minimum value of the second integral.\ndissipation::Float64: The difference between the maximum and minimum values (indicating dissipation).\n\nErrors\n\nThrows an ErrorException if dx is not a positive real number.\n\nExample\n\n# Example usage\nU = rand(ComplexF64, 100, 10)  # Random complex-valued matrix with 100 spatial points and 10 time steps\ndx = 0.1                      # Spatial step size\n\nsecond_integral, max_val, min_val, dissipation = second_conservation(U, dx)\n\nprintln(\"Second integral: \", second_integral)\nprintln(\"Maximum value: \", max_val)\nprintln(\"Minimum value: \", min_val)\nprintln(\"Dissipation: \", dissipation)\n\n\n\n\n\n","category":"method"},{"location":"","page":"Home","title":"Home","text":"Der Code kann ausgeführt werden, indem die Datei NLS.jl im Ordner src ausgeführt wird.","category":"page"},{"location":"#Ergebnisse","page":"Home","title":"Ergebnisse","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Das Finite Differenzen Schema aus [1] erhält die beiden oben genannten Größen, während das explizite Finite Differenzen Schema diese nicht erhält. Weiterhin konnte beobachtet werden, dass das explizite Verfahren sehr instabil ist und nur für sehr kleine Gittweiten und noch kleinere Zeitschritte plausible Werte liefert. Das explizite Verfahren erhält auch keine der beiden Erhaltungsgrößen.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Auch kann mit numerischen Experimenten nur eine Konvergenz der Differenz der Normen beobachtet werden, während Norm der Differenz recht hoch ist und das Verfahren gegen eine andere Lösung konvergiert als die Testlösung. Im Paper [1] wird die Konvergenz behauptet, aber nicht bewiesen.","category":"page"},{"location":"#Visualisierung","page":"Home","title":"Visualisierung","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"(Image: Absolutwerte der Lösungen) (Image: Realwerte der Lösungen) (Image: Imaginärwerte der Lösungen)","category":"page"},{"location":"#Transparenz-Hinweis-KI","page":"Home","title":"Transparenz-Hinweis KI","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Der Code für die NLS-Gleichung wurde ohne Zurhilfenahme von KI erstellt. Die Dokumentation des Codes und das Bash-Skript zur Ausführung wurden mit Hilfe von ChatGPT erstellt und menschlich nochmal geprüft.","category":"page"},{"location":"#Referenzen","page":"Home","title":"Referenzen","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"[1] M. Delfour, M. Fortin, G. Payre: Finite Difference Solutions of a Non-linear Schrödinger equation. Journal of Computational Physics 44, 277-288 (1981) Journal","category":"page"}]
}
