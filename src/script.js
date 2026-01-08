
const form = document.querySelector('form');
const emailInput = document.getElementById('email');
const statusIcon = document.getElementById('status-icon');
const helperText = document.getElementById('helper-text');
const submitBtn = form.querySelector('button');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

emailInput.addEventListener('input', function (event) {
    const email = event.target.value;

    if (email === '') {
        resetStyles();
        return;
    }

    const isValid = emailRegex.test(email);
    if (isValid) {
        setValidState();
    } else {
        setInvalidState();
    }
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = emailInput.value;

    if (!emailRegex.test(email)) {
        emailInput.focus();
        setInvalidState();
        return;
    }

    const originalBtnText = "Inscrever-se agora";
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="ph ph-spinner animate-spin text-xl align-middle mr-2"></i> Enviando...';
    submitBtn.classList.add('opacity-75', 'cursor-not-allowed');

    setTimeout(() => {
        submitBtn.innerHTML = '<i class="ph-fill ph-check-circle text-xl align-middle mr-2"></i> Inscrito com Sucesso!';
        submitBtn.classList.replace('bg-slate-900', 'bg-emerald-600');
        submitBtn.classList.replace('hover:bg-slate-800', 'hover:bg-emerald-700');
        helperText.innerText = "Cadastro realizado! Verifique sua caixa de entrada.";

        setTimeout(() => {
            emailInput.value = '';
            resetStyles();

            submitBtn.disabled = false;
            submitBtn.innerText = originalBtnText;
            submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
            submitBtn.classList.replace('bg-emerald-600', 'bg-slate-900');
            submitBtn.classList.replace('hover:bg-emerald-700', 'hover:bg-slate-800');
        }, 3000);

    }, 1500);
});

function setValidState() {
    emailInput.className = "block w-full pl-10 pr-10 py-3 bg-slate-50 border-2 border-emerald-500 rounded-xl text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300";
    statusIcon.innerHTML = '<i class="ph-fill ph-check-circle text-emerald-500 text-xl"></i>';
    statusIcon.classList.remove('opacity-0');
    helperText.innerText = "E-mail válido! Pronto para decolar.";
    helperText.className = "mt-2 text-xs text-emerald-600 font-medium ml-1 transition-colors duration-300";
}

function setInvalidState() {
    emailInput.className = "block w-full pl-10 pr-10 py-3 bg-slate-50 border-2 border-red-400 rounded-xl text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all duration-300";
    statusIcon.innerHTML = '<i class="ph-fill ph-warning-circle text-red-500 text-xl"></i>';
    statusIcon.classList.remove('opacity-0');
    helperText.innerText = "Humm... esse e-mail parece incompleto.";
    helperText.className = "mt-2 text-xs text-red-500 ml-1 transition-colors duration-300";
}

function resetStyles() {
    emailInput.className = "block w-full pl-10 pr-10 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300";
    statusIcon.classList.add('opacity-0');
    helperText.innerText = "Comece a digitar para validar...";
    helperText.className = "mt-2 text-xs text-slate-500 ml-1 transition-colors duration-300";
}