class Cronometro{
    constructor(display, resultados){
        this.rodando = false;
        this.display = display;
        this.resultados = resultados;
        this.tempoTotal = 0;
        this.ultimaVolta = 0;
        this.voltas = [];
        this.zerarTempo();
        this.print();
    }

    zerarTempo(){
        this.rodando = false;
        document.querySelector('.results').hidden = true;
        this.tempoTotal = 0;
        this.ultimaVolta = 0;
        this.voltas = [];
        clearChildren(this.resultados);
        this.print();
    }

    iniciarTempo(){
        this.tempo = performance.now();
        if(!this.rodando){
            this.rodando = true;
            requestAnimationFrame(this.step.bind(this));
        } 

    }

    darVolta(){
        if(!this.rodando) return;
        let tempoAtual = this.tempoTotal;
        let tempoVolta = tempoAtual - this.ultimaVolta;
        this.voltas.push(tempoAtual);

        document.querySelector('.results').hidden = false;
        let tr = document.createElement('tr');
        let tdVolta = document.createElement('td');
        tdVolta.innerText = pad0(this.voltas.length,2);
        let tdTempoVolta = document.createElement('td');
        tdTempoVolta.innerText = this.formatarTempo(tempoVolta);
        let tdTempoTotal = document.createElement('td');
        tdTempoTotal.innerText = this.formatarTempo(tempoAtual);

        tr.appendChild(tdVolta);
        tr.appendChild(tdTempoVolta);
        tr.appendChild(tdTempoTotal);

        this.resultados.appendChild(tr);
        this.ultimaVolta = tempoAtual;
    }

    pararTempo(){
        this.rodando = false;
        this.tempo = null;
    }

    step(timestamp){
        if (!this.rodando) return;
        this.calcularTempo(timestamp);
        this.tempo = timestamp;
        this.print();
        requestAnimationFrame(this.step.bind(this));
    }

    calcularTempo(timestamp){
        let diff = timestamp - this.tempo;
        this.tempoTotal += diff;
    }

    print() {
        this.display.innerText = this.formatarTempo(this.tempoTotal);
    }

    formatarTempo(ms){
        let minutos = Math.floor(ms / 60000);
        ms %= 60000;

        let segundos = Math.floor(ms / 1000);
        ms %= 1000;

        let centesimos = Math.floor(ms / 10);
        return `${pad0(minutos,2)}:${pad0(segundos,2)}.${pad0(centesimos,2)}`;
    }

}

function pad0(valor, count) {
    var resultado = valor.toString();
    for (; resultado.length < count; --count)
        resultado = '0' + resultado;
    return resultado;
}

function clearChildren(node) {
    while (node.lastChild)
        node.removeChild(node.lastChild);
}

let cronometro = new Cronometro(
    document.querySelector('.stopwatch'),
    document.querySelector('.results tbody'));
