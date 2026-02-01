
class NeuralNetwork {
  constructor(inputSize, outputSize, numHiddenLayers, hiddenSize) {
    this.inputSize = inputSize;
    this.outputSize = outputSize;
    this.numHiddenLayers = numHiddenLayers;
    this.hiddenSize = hiddenSize;

    this.weights = {};
    this.weights["in"] = this.randomMatrix(hiddenSize, inputSize);

    for (let i = 0; i < numHiddenLayers - 1; i++) {
      this.weights[`h${i}`] = this.randomMatrix(hiddenSize, hiddenSize);
    }

    this.weights["out"] = this.randomMatrix(outputSize, hiddenSize);
  }

  randomMatrix(rows, cols) {
    let m = [];
    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < cols; j++) {
        row.push(random(-1, 1));
      }
      m.push(row);
    }
    console.log("st", m.length, m[0].length);
    return m;
  }

  sigmoid(z) {
    return 1 / (1 + Math.exp(-z));
    // return 1 ;
  }

  activate(vec) {
    return vec.map(v => this.sigmoid(v));
  }

  matVecMul(mat, vec) {
    let result = [];
    for (let i = 0; i < mat.length; i++) {
      let sum = 0;
      for (let j = 0; j < vec.length; j++) {
        sum += mat[i][j] * vec[j];
      }
      result.push(sum);
    }
    // console.log(mat.length, mat[0].length, vec.length, result.length);
    return result;
  }

  feedforward(input) {
    let a = input.slice();

    
    a = this.activate(this.matVecMul(this.weights["in"], a));

    // hidden layers
    for (let i = 0; i < this.numHiddenLayers - 1; i++) {
        a = this.activate(this.matVecMul(this.weights[`h${i}`], a));
    }
    
    let output = this.activate(this.matVecMul(this.weights["out"], a));
    return output;
  }

  copyNN(otherNN){
    for (const key in this.weights) {
      for (let r = 0; r < otherNN.weights[key].length; r++){
        for (let c = 0; c < otherNN.weights[key][r].length; c++){
          this.weights[key][r][c] = otherNN.weights[key][r][c];
        }
      }
    }
  }

  mutate(mutationRate){
    for (const key in this.weights) {
      for (let r = 0; r < this.weights[key].length; r++){
        for (let c = 0; c < this.weights[key][r].length; c++){
          if (random() < mutationRate){
            this.weights[key][r][c] += random(-0.1, 0.1);
          }
        }
      }
    }
  }
}
