function compute() {
    $('#calculate-button').addClass('button-animation');
    let vectorA = document.getElementById('vectorA').value.split(',').map(Number);
    let vectorB = document.getElementById('vectorB').value.split(',').map(Number);

    // Menyiapkan rumus dengan deskripsi
    let angleResult = calculateAngle(vectorA, vectorB);
    let additionFormula = '<p><strong>Operasi Penjumlahan:</strong></p>' + formatVectorOperationCombined(vectorA, vectorB, "+");
    let subtractionFormula = '<p><strong>Operasi Pengurangan:</strong></p>' + formatVectorOperationCombined(vectorA, vectorB, "-");
    let dotProductFormula = '<p><strong>Operasi Perkalian (Dot Product):</strong></p>' + formatDotProductCombined(vectorA, vectorB);
    let angleFormula = `
        <div>${angleResult.formula}</div>
        <div>${angleResult.steps}</div>
    `;


    // Hilangkan kelas animasi setelah beberapa waktu
    setTimeout(function() {
        $('#calculate-button').removeClass('button-animation');
    }, 200);

    // Tambahkan kelas animasi saat hasil muncul
    $('#result').addClass('result-animation');

    // Mengisi innerHTML elemen hasil dengan menyertakan deskripsi dan rumus
    document.getElementById('result').innerHTML = `
        <div>${additionFormula}</div>
        <div>${subtractionFormula}</div>
        <div>${dotProductFormula}</div>
        ${angleFormula}
    `;
    
    // Meminta MathJax untuk memproses konten baru
    MathJax.typesetPromise && MathJax.typesetPromise();
}

function addVectors(vectorA, vectorB) {
    // Memastikan kedua vektor panjang nya sama
    if (vectorA.length !== vectorB.length) {
        console.error("Vectors are of different lengths.");
        return [];
    }

    let resultVector = [];
    for (let i = 0; i < vectorA.length; i++) {
        resultVector.push(vectorA[i] + vectorB[i]);
    }
    return resultVector;
}

function subtractVectors(vectorA, vectorB) {
    // Memastikan kedua vektor panjang nya sama
    if (vectorA.length !== vectorB.length) {
        console.error("Vectors are of different lengths.");
        return [];
    }

    let resultVector = [];
    for (let i = 0; i < vectorA.length; i++) {
        resultVector.push(vectorA[i] - vectorB[i]);
    }
    return resultVector;
}

function dotProduct(vectorA, vectorB) {

    // Memastikan kedua vektor panjang nya sama
    if (vectorA.length !== vectorB.length) {
        console.error("Vectors are of different lengths.");
        return null;
    }
    let result = 0;
    for (let i = 0; i < vectorA.length; i++) {
        result += vectorA[i] * vectorB[i];
    }
    return result;
}  

// Fungsi untuk menghapus kelas animasi dari hasil saat tombol "Hitung" ditekan kembali
function clearResultAnimation() {
    $('#result').removeClass('result-animation');
}

// Melekatkan kembali fungsi `compute()` saat tombol "Hitung" ditekan kembali
document.getElementById('calculate-button').addEventListener('click', function() {
    compute();
    setTimeout(clearResultAnimation, 200);
});

function formatVectorAsMatrix(vector) {
    return '\\begin{bmatrix}' + vector.join('\\\\') + '\\end{bmatrix}';
}

function vectorMagnitude(vector) {
    return Math.sqrt(vector.reduce((acc, val) => acc + val * val, 0));
}

function calculateAngle(vectorA, vectorB) {
    let dot = dotProduct(vectorA, vectorB);
    let magnitudeA = vectorMagnitude(vectorA);
    let magnitudeB = vectorMagnitude(vectorB);
    let cosTheta = dot / (magnitudeA * magnitudeB);
    let angleRadians = Math.acos(cosTheta);
    let angleDegrees = angleRadians * (180 / Math.PI);

    let angleFormula = `<p><strong>Sudut antara dua vektor:</strong> ${angleDegrees.toFixed(2)}°</p>`;
    let angleSteps = formatAngleCalculationSteps(vectorA, vectorB);

    return {
        angle: angleDegrees.toFixed(2),
        formula: angleFormula,
        steps: angleSteps
    };
}


// Fungsi untuk memformat langkah operasi penjumlahan dan pengurangan
function formatOperationSteps(vectorA, vectorB, operation) {
    let steps = "Steps:<br>";
    vectorA.forEach((value, index) => {
        steps += `${value} ${operation} ${vectorB[index]} = ${operation === "+" ? value + vectorB[index] : value - vectorB[index]}<br>`;
    });
    return steps;
}

function formatVectorOperationCombined(vectorA, vectorB, operation) {
    let stepsLatex = "\\["; // Memulai formula MathJax
    let operationSymbol = operation === "+" ? "+" : "-";
    stepsLatex += formatVectorAsMatrix(vectorA) + "\\ " + operationSymbol + "\\ " + formatVectorAsMatrix(vectorB);
    stepsLatex += "\\ =\\ "; // Menambahkan tanda sama dengan
    let resultVector = operation === "+" ? addVectors(vectorA, vectorB) : subtractVectors(vectorA, vectorB);
    stepsLatex += formatVectorAsMatrix(resultVector);
    stepsLatex += "\\]"; // Mengakhiri formula MathJax
    return stepsLatex;
}


function formatDotProductCombined(vectorA, vectorB) {
    let stepsLatex = "\\["; // Memulai formula tampilan MathJax (tanpa backslash tambahan)

    // Menyiapkan langkah perkalian
    let multiplicationSteps = vectorA.map((a, i) => `${a} \\cdot ${vectorB[i]}`).join(' + ');

    // Menghitung hasil
    let result = dotProduct(vectorA, vectorB);

    // Menyusun rumus lengkap: langkah + hasil
    stepsLatex += multiplicationSteps + "\\ =\\ " + result;

    stepsLatex += "\\]"; // Mengakhiri formula MathJax (tanpa backslash tambahan)

    return stepsLatex;
}


    
function showCalculator() {
    
    document.getElementById('intro-page').style.display = 'none';
    document.getElementById('calculator-page').style.display = 'block';
    }
function vectorMagnitude(vector) {
  return Math.sqrt(vector.reduce((acc, val) => acc + val * val, 0));
}

function showCalculatorAndScroll() {
    // Tampilkan kalkulator jika tersembunyi
    var calculatorPage = document.getElementById('calculator-page');
    
    // Memastikan elemen kalkulator ditampilkan sebelum melanjutkan
    calculatorPage.style.display = 'block';
    
    // Gunakan smooth scroll ke elemen tersebut
    calculatorPage.scrollIntoView({ behavior: 'smooth' });
}

function formatAngleCalculationSteps(vectorA, vectorB) {
    let dot = dotProduct(vectorA, vectorB);
    let magnitudeA = vectorMagnitude(vectorA);
    let magnitudeB = vectorMagnitude(vectorB);
    let cosTheta = dot / (magnitudeA * magnitudeB);
    let angleRadians = Math.acos(cosTheta);
    let angleDegrees = angleRadians * (180 / Math.PI);

    let stepsLatex = "\\begin{aligned}"; // Start MathJax aligned environment

    // Step 1: Langkah 1: Menghitung dot product
    let dotProductSteps = formatDotProductCombined(vectorA, vectorB).replace(/^\\\[|\\\]$/g, '');
    stepsLatex += "&\\text{Dot Product: } " + dotProductSteps + "\\\\" + "\\\\";

    // Step 2: Menghitung besar vektor
    stepsLatex += "&\\text{Besar Vector A: } \\|\\vec{a}\\| = " + magnitudeA.toFixed(2) + "\\\\"; 
    stepsLatex += "&\\text{Besar Vector B: } \\|\\vec{b}\\| = " + magnitudeB.toFixed(2) + "\\\\" + "\\\\";

    // Step 3: Menghitung cosinus sudut
    stepsLatex += "&\\cos(\\theta) = \\frac{\\vec{a} \\cdot \\vec{b}}{\\|\\vec{a}\\| \\|\\vec{b}\\|} = \\frac{" + dot + "}{" + magnitudeA.toFixed(2) + " \\times " + magnitudeB.toFixed(2) + "} = " + cosTheta.toFixed(2) + "\\\\" + "\\\\";

    // Step 4: Menghitung sudut dalam radian
    stepsLatex += "&\\theta = \\cos^{-1}(" + cosTheta.toFixed(2) + ") = " + angleRadians.toFixed(2) + " \\text{ radians}\\\\" + "\\\\";

    // Step 5: Konversi sudut dari radian ke derajat
    stepsLatex += "&\\theta = " + angleRadians.toFixed(2) + " \\text{ radians} \\times \\frac{180^\\circ}{\\pi} = " + angleDegrees.toFixed(2) + "^\\circ";

    stepsLatex += "\\end{aligned}"; // End MathJax aligned environment

    return stepsLatex;
}

