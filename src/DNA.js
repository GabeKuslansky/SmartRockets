// Dna for rockets

function DNA(genes) {
    if (genes) {
        this.genes = genes;
    }
    else {
        this.genes = [];
        for (var i = 0; i < life; i++) {
            this.genes[i] = p5.Vector.random2D();
            this.genes[i].setMag(maxforce);
        }
    }

    DNA.prototype.crossover = function (partner) {
        var newgenes = [];
        var mid = floor(random(this.genes.length / 2));
        for (var i = 0; i < this.genes.length; i++) {
            var rand = random(this.genes.length);
            if (rand > mid) {
                newgenes[i] = this.genes[i];
            }
            else {
                newgenes[i] = partner.genes[i];
            }
        }
        return new DNA(newgenes);
    }

    DNA.prototype.mutation = function () {
        for (var i = 0; i < this.genes.length; i++) {
            if (random(1) < 0.001) {
                this.genes[i] = p5.Vector.random2D();
                this.genes[i].setMag(maxforce);
            }
        }
    }
}