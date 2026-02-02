
class GA{
    constructor(populationSize){
        this.populationSize = populationSize;
        this.fitnessWiseGenotypes = [];
        this.population = [];
        this.generation = 0;
    }

    initialize(imgW, imgH){
        for(let i = 0; i<this.populationSize; i++){
            let genotype = new Genotype();
            genotype.randomize(imgW, imgH);
            append(this.population, genotype);
        }
    }

    render(imgW, imgH){
        let idx = 0;
        let numRows = int(height/imgH);
        let numCols = int(height/imgW);
        for (let i = 0; i < 1; i++){
            let genotype = this.fitnessWiseGenotypes[i][0];
            let r = int(idx/numCols);
            let c = idx%numCols;
            if (r == 0) {c+=1;}
            push();
            translate(c*imgW, r*imgH);
            genotype.render(imgW, imgH);
            pop();
            idx += 1;
        }

        text("Current Generation: " + str(this.generation), height + 100, 100);
        text("Fittest: " + str(this.fitnessWiseGenotypes[0][1]), height + 100, 200);
    }

    selectParent(sortedPopulation){
        let parentIdx = int(random(this.populationSize*0.1));
        return sortedPopulation[parentIdx][0];
    }

    rePopulate(sortedPopulation){
        let newPopulation = [];
        for (let i = 0; i < this.populationSize; i++){
            let parent1 = this.selectParent(sortedPopulation);
            let parent2 = this.selectParent(sortedPopulation);
            let child = parent1.crossover(parent2);
            child.mutate(0.05);
            append(newPopulation, child);
        }
        
        for (let i = 0; i < this.populationSize; i++){
            this.population[i] = newPopulation[i];
        }
    }

    calculate(gtImg){
        this.fitnessWiseGenotypes = [];
        for (let genotype of this.population){
            let sim = genotype.calculateSimilarity(gtImg);
            append(this.fitnessWiseGenotypes, [genotype, sim]);
        }
        this.fitnessWiseGenotypes.sort((a, b) => b[1] - a[1]);
        this.rePopulate(this.fitnessWiseGenotypes);
        
        this.generation += 1;
    }
}