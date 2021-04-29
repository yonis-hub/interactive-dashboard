console.log("Loading app.js....my code here!")


//Draw Bar Graph 
function drawBarGraph(sampleId) {
    console.log(`drawBarGraph(${sampleId})`);

    d3.json("data/samples.json").then(function(data){
        // console.log(data);

        var samples = data.samples;
        var resultArray = samples.filter(sample => sample.id == sampleId);
        // console.log(resultArray);
        var result = resultArray[0]; /// VIDEO 59:01 left off
    });

}

// Draw Bubble Chart
function drawBubbleChar(sampleId) {
    console.log(`drawbubblechar(${sampleId})`);
}

// Show Meta Data
function showMetaData(sampleId) {
    console.log(`showMetaData(${sampleId})`);
}

// Draw Gague - bonus
// function drawGague(sampleId) {
//     console.log(`showMetaData(${sampleId})`);
// }

// Event handler
function optionChanged(newSampleId) {
    console.log(`User selected ${newSampleId}`);

    drawBarGraph(newSampleId);
    drawBubbleChar(newSampleId);
    showMetaData(newSampleId);


}

// This code comes from Dom's office hour examples 
function InitDashboard() {
    console.log("InitDashboard()");

    //populate the dropdown manu
    var selector = d3.select("#selDataset");

    d3.json("data/samples.json").then(function(data){
        console.log(data);

        var sampleNames = data.names;
        //loop for the sample name drop down manu
        sampleNames.forEach(sampleId => {
            selector.append("option")
            .text(sampleId)
            .property("value", sampleId);


        });

        var id = sampleNames[0];

        //Draw the graphs and the metadata
        drawBarGraph(id);
        drawBubbleChar(id);
        showMetaData(id);

        //bonus chart
        // drawGague(id);






    });

   

}

InitDashboard();