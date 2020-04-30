// gitHubb repo: https://github.com/HadaSheldor/inClass_projectCountries.git

/// <reference path="jquery-3.4.1.js" />
"use strict";

$(() => {

    // displays all countries
    $("#showAll").click(()=> {
        getDataFromAjax("https://restcountries.eu/rest/v2/all", countriesData => displayAllCountries(countriesData));
    });
    
    // displays search result
    $("#searchBtn").click(()=> {
        getDataFromAjax("https://restcountries.eu/rest/v2/name/" + $("#searchInput").val(), countriesData => displayAllCountries(countriesData));
    });
    
    // prevents "enter" keyboard to refresh the entire page
    $(window).keydown(function(event) {
        if(event.keyCode === 13) {
            event.preventDefault();
            getDataFromAjax("https://restcountries.eu/rest/v2/name/" + $("#searchInput").val(), countriesData => displayAllCountries(countriesData));
            return false;
        }
    });

    // gets data from aJax
    function getDataFromAjax(url,callBack) {
        $.ajax({
            method: "GET",
            url: url,
            error: err => alert("Error! Please insert a valid country name"),
            success: countriesData => callBack(countriesData),
        });
    }

    // creates a card for each country
    function displayAllCountries(allCountries) {
        $("#myDiv").empty();
        let count = 0;
        for (const item of allCountries) {
            count++;
            const countryCard = `
            <div class="card border-info mb-3 mr-3" id="countryDetails">
                <div class="card-header"><img src="${item.flag}" style="width:250px; height: 150px"></div>
                <div class="card-body text-info" id="countryDetails${count}"> 
                    <h5 class="card-title" style="text-align:center; font-size:larger"><b>${item.name}</b></h5>
                    <hr>
                    <p class="card-titel"><b>Capital: </b> ${item.capital}</p>
                    <p class="card-titel"><b>Top Level Domain: </b> ${item.topLevelDomain}</p>
                </div>
            </div> 
            `;
            $("#myDiv").append(countryCard);
            // gets ALL currencies of each country
            for (const prop in item.currencies) {
                if (item.currencies[prop].name === null || item.currencies[prop].name === undefined) {
                    item.currencies[prop].name = "";
                } else if(item.currencies[prop].code === null || item.currencies[prop].code === undefined) {
                    item.currencies[prop].code = "";
                } else if(item.currencies[prop].symbol === null || item.currencies[prop].symbol === undefined) {
                    item.currencies[prop].symbol = "";
                } else {
                    const currencies = `
                    <hr>
                    <div class="card-title" id="currenciesDetails">
                        <p class="card-titel"><b>Currency Name: </b> ${item.currencies[prop].name}</p>
                        <p class="card-titel"><b>Currency Code: </b> ${item.currencies[prop].code}</p>
                        <p class="card-titel"><b>Currency Symbol: </b> ${item.currencies[prop].symbol}</p>
                    </div>
                    `;
                    $(`#countryDetails${count}`).append(currencies);
                }
            }
        }
    }
})