"use strict";
$(document).ready(function() {
    var index = 0;

    // the object all data from the rows will be stored in
    function Node(name, profit, weight) {
        this.name = name;
        this.profit = profit;
        this.weight = weight;
        this.ratio = profit / weight;
    }
    $("#addbutton").click(function(event) { // add a new row of text input when the add row button is pushed
        var table = $("#item-table");
        table = document.getElementById("item-table");
        var row = table.insertRow(table.rows.length);
        var cell1 = row.insertCell(0);
        var t1 = document.createElement("input");
        t1.id = "Name" + index;
        cell1.appendChild(t1);
        var cell2 = row.insertCell(1);
        var t2 = document.createElement("input");
        t2.id = "Profit" + index;
        cell2.appendChild(t2);
        var cell3 = row.insertCell(2);
        var t3 = document.createElement("input");
        t3.id = "Weight" + index;
        cell3.appendChild(t3);
        index++;
    });
    var arr = [];
    $("#gobutton").click(function() { //  compute the fractional knapsack
        var table = document.getElementById("item-table");
        var capacity = Number($('#capacity').val());

        //  get the data from each row and store it in a node
        for (var row, i = 0; row = table.rows[i]; i++) {
            //iterate through rows
            //rows would be accessed using the "row" variable assigned in the for loop
            var name = $('#Name' + i);
            // name = document.getElementById("Name"+i);
            var profit = $('#Profit' + i);
            var weight = $('#Weight' + i);
            console.log(name.val());
            var ratio = Number(profit.val()) / Number(weight.val());
            console.log(ratio);
            var node = new Node(name.val(), profit.val(), weight.val());
            //  if the ratio is not a number, then push the node to the storage array
            if (!isNaN(ratio)) {
                arr.push(node);
            }
        }
        console.log(arr);
        //  sort the array using the custom built quicksort function below
        arr = sort(arr);
        console.log(arr);

        //  add items to the knapsack recursively
        addItem(arr, capacity);
        
        

        //  display the final knapsack container as well as the final profit.  then reset the knapsack and profit
        document.getElementById("final_knapsack").innerHTML =finalknapsack;
        document.getElementById("final_profit").innerHTML =finalweight;
        console.log(finalknapsack);
        console.log(finalweight);
        finalknapsack = [];
        finalweight = 0;
    });

    //  facade for quicksort
    function sort(array) {
        return quickSort(array, 0, array.length - 1);
    }

    function quickSort(arr, left, right) {
        var len = arr.length,
            pivot,
            partitionIndex;
        if (left < right) {
            pivot = right;
            partitionIndex = partition(arr, pivot, left, right);
            //sort left and right
            quickSort(arr, left, partitionIndex - 1);
            quickSort(arr, partitionIndex + 1, right);
        }
        return arr;
    }

    function partition(arr, pivot, left, right) {
        var pivotValue = arr[pivot].ratio,
            partitionIndex = left,
            weightval = arr[pivot].weight;

        for (var i = left; i < right; i++) {
            if (arr[i].ratio > pivotValue) {
                swap(arr, i, partitionIndex);
                partitionIndex++;
            }
            if(arr[i].ratio == pivotValue && arr[i].weight < weightval){
            	swap(arr, i, partitionIndex);
            	partitionIndex ++;
            }
        }
        swap(arr, right, partitionIndex);
        return partitionIndex;
    }

    function swap(arr, i, j) {
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    //  add items to the final knapsack and final profit
    var finalknapsack = [];
    var finalweight = 0;
    function addItem(array, capacity) {
        
        //  first take off the first item in the array
        var node = array.shift();

        //  if this item is beyond the capacity of our knapsack
        if (capacity - node.weight < 0) {
            
            var ratio = capacity / node.weight;
            capacity = 0;
            finalknapsack.push(ratio + " " + node.name);
            finalweight = Number(finalweight) + parseFloat(ratio) * Number(node.profit);
            return;
        }
        else{  // if we can safely add the item to our knapsack
        	capacity = capacity - node.weight;
            finalknapsack.push(node.name);
            finalweight += Number(node.profit);
        }

        //  recursively go through and add more items if there is still both capacity and items to add
        if(capacity > 0 && array.length >= 1){
        	console.log('cap: ' + capacity);
            console.log('arr len ' + array.length);
        	addItem(array, capacity);
        }

    }
});