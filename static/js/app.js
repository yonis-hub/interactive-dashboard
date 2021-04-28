console.log("Loading app.js....my code here!")


// This code comes from Dom's office hour examples 
function InitDashboard() {
    console.log("InitDashboard()");

    //populate the dropdown manu
    var selector = d3.select("#selDataset");

    d3.json("data/samples.json").then(function(data){
        console.log(data);

        var sampleNames = data.names;

        sampleNames.forEach(sampleId => {
            selector.append("option")
            .text(sampleId)
            .property("value", sampleId);


        });
    });

    // update the bar graph

    //update the bubblechart


    //update the demographic info

}

InitDashboard();