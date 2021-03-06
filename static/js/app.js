console.log("Loading app.js....my code here!")


//Draw Bar Graph 
function drawBarGraph(sampleId) {
    // console.log(`drawBarGraph(${sampleId})`);

    d3.json("data/samples.json").then(function(data){
        // console.log(data);

        var samples = data.samples;
        var resultArray = samples.filter(s=> s.id == sampleId);
        // console.log(resultArray);
        var result = resultArray[0]; 
        // console.log(result);

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        // console.log(otu_labels);

        var sample_values = result.sample_values;
        // console.log(sample_values);

        yticks = otu_ids.slice(0,10).map(otuId => `OTU ${otuId}`).reverse();

        var barData = {
            x: sample_values.slice(0,10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0,10).reverse(),
            orientation: "h"
        }

        //plot to plotly
        var barArray = [barData];

        var barLayout = {
            title: 'Top 10 Bacteria Cultures Found',
            margin: {t:30, l:150}
        }

        Plotly.newPlot('bar',barArray, barLayout)

    });

}

// Draw Bubble Chart
function drawBubbleChar(sampleId) {
    // console.log(`drawbubblechar(${sampleId})`);

    d3.json("data/samples.json").then(data => {

        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        var bubbleData = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker : {
                size: sample_values,
                color: otu_ids
            }
        };

        var bubbleArray = [bubbleData];


        var bubbleLayout = {
            title: "Sample Values vs OTU Ids",
            xaxis: { title: "OTU ID"},
            yaxis: { title: "Sample Value"}
        }

        Plotly.newPlot("bubble", bubbleArray, bubbleLayout);

    });
}

// Show Meta Data
function showMetaData(sampleId) {
    // console.log(`showMetaData(${sampleId})`);

    d3.json("data/samples.json").then(data => {

        var metadata = data.metadata;
        var metaArray = metadata.filter (m => m.id == sampleId);
        var meta = metaArray[0];

        var meta_id = meta.id;
        var meta_ethnicity = meta.ethnicity;
        var meta_gender = meta.gender;
        var meta_age = meta.age;
        var meta_location = meta.location;
        var meta_bbtype = meta.bbtype;
        var meta_wfreq = meta.wfreq;

        var select = d3.select("#sample-metadata")

        select.html("");

        select.append('ul').text(`id: ${meta_id}`);
        select.append('ul').text(`ethnicity: ${meta_ethnicity}`);
        select.append('ul').text(`gender: ${meta_gender}`);
        select.append('ul').text(`age: ${meta_age}`);
        select.append('ul').text(`location: ${meta_location}`);
        select.append('ul').text(`bbtype: ${meta_bbtype}`);
        select.append('ul').text(`wfreq: ${meta_wfreq}`);
    });
};

// Draw Gague - bonus
function drawGague(sampleId) {
    // console.log(`showMetaData(${sampleId})`);

    d3.json("data/samples.json").then(data => {

        var metadata = data.metadata;
        var metaArray = metadata.filter (m => m.id == sampleId);
        var meta = metaArray[0];
        
        var meta_wfreq = meta.wfreq;

        // console.log(`meta${meta_wfreq}`);

        var data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: meta_wfreq,
                type: "indicator",
                mode: "gauge+number"
            }
        ];
        
        var layout = { 
            width: 600, 
            height: 500, 
            margin: { t: 0, b: 150, l:0 } };

        Plotly.newPlot('gauge', data, layout);

    });
};


// Event handler
function optionChanged(newSampleId) {
    // console.log(`User selected ${newSampleId}`);

    drawBarGraph(newSampleId);
    drawBubbleChar(newSampleId);
    showMetaData(newSampleId);
    drawGague(newSampleId);


}

// This code comes from Dom's office hour examples 
function InitDashboard() {
    // console.log("InitDashboard()");

    //populate the dropdown manu
    var selector = d3.select("#selDataset");

    d3.json("data/samples.json").then(function(data){
        // console.log(data);

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
        // bonus chart
        drawGague(id);


    });

}

InitDashboard();