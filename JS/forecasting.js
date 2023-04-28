const UnitHrInput = document.querySelector("#expFDate")
const ModelSelectField = document.querySelector("#TypeOfWork")
const UnitQuantityInput = document.querySelector("#Area")

const predictionResult = document.getElementById('predictionResult')
const predictButton = document.getElementById('predictButton')

// Add a click event listener to the predict button
predictButton.addEventListener('click', predict);

// Define the predict function
async function predict() {
    // Get the values from the input fields
        let result = 0;
        const input1 = result;
        const input2 = Number(UnitQuantityInput.value);

        var input3 = Number(UnitHrInput.value);
        //Convert UnitDays x 8hours
        input3 = (input3 * 8 );
        console.log(input3); 
        const modelSelect = ModelSelectField.value;

    switch (modelSelect) {
        case "B2 - Carpentry Works for Main Counter":
          var RateOfWork = 2.6667;
          result = (RateOfWork * input2) / input3;
          break;
  
        case "C1 - Stainless Works for Main Counter":
          RateOfWork = 5.33333;
          result = (RateOfWork * input2) / input3;
          break;
  
        case "D2 - Pipeline and Fixture Installation":
          RateOfWork = 1;
          result = (RateOfWork * input2) / input3;
          break;
  
        case "D3 - Drainage Pipeline Installation":
          RateOfWork = 0.8;
          result = (RateOfWork * input2) / input3;
          break;
  
        case "G1 - Plain Concrete Surfaces (Surface Prep - Primer - Finish Coat)":
          RateOfWork = 0.54;
          var specificproductivityRatioValue = 4.32;
          result = input2 / (input3 * specificproductivityRatioValue);
          break;
  
        case "G2 - Wooden_Metal Surfaces (Surface Prep - Primer - Finish Coat)":
          RateOfWork = 0.45;
          var specificproductivityRatioValue = 3.96;
          result = input2 / (input3 * specificproductivityRatioValue);
          break;
  
  
          default:
              result = null;
              unit = "";
              break;
      }

    if (result === null) {
        console.log("Please select a valid option for the Model Select field.");
        return;
    }


    // Load the Keras model based on the selected option
    console.log('Loading model...');
    const modelUrl = `models/${modelSelect}/model.json`;
    const model = await tf.loadLayersModel(modelUrl);

    if (model) {
        console.log('Model loaded successfully!');
    } else {
        console.log('Error: failed to load model.');
        return;
    }

    //Pre-processing Techniques
    const preprocessedDataUrl = `models/${modelSelect}/preprocessed_data.json`;
    const preprocessedDataResponse = await fetch(preprocessedDataUrl);
    const preprocessedData = await preprocessedDataResponse.json();

    if (preprocessedData) {
        console.log('Preprocessed data loaded successfully!');
    } else {
        console.log('Error: failed to load preprocessed data.');
        return;
    }

    //  Scale the input2 value using the MinMaxScaler technique
    // const minVal = Math.min(...preprocessedData);
    // const maxVal = Math.max(...preprocessedData);
    // const input2Scaled = (input2 - minVal) / (maxVal - minVal);
  
    //model prediction
    // Create a tensor with the input values
    // Define the input tensor based on the modelSelect variable with Normalization Technique

    let inputTensor;
    inputTensor = tf.tensor2d([[input1, input2, input3]], [1, 3]);
    
    // Call the predict function on the model with the input tensor
    const prediction = model.predict(inputTensor);

    console.log(prediction)

    // Get the prediction value as a scalar
    const predictionValue = prediction.dataSync()[0];

    // Round off the prediction value based on the given condition
    const roundedPredictionValue = (predictionValue % 1 <= 0.44) ? 
        Math.floor(predictionValue) : Math.round(predictionValue);

    console.log(" The predicted value is",predictionValue)
    // Display the result on the page
    predictionResult.innerHTML = `Your predicted number of worker for the ${modelSelect} is ${roundedPredictionValue}, Please decided if the number is enough.`;

    // Clean up memory by disposing of the tensor and the model
    inputTensor.dispose();
    model.dispose();
}