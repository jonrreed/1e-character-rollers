	//var statnames = ["Strength: ","Intelligence: ","Wisdom: ","Dexterity: ","Constitution: ","Charisma: "];
	var stats = [];
	var classStats = [];
	var classNames = [];
	var rerolls = 0;
	var avgTotal = 0;
	
	var swapBtns = document.getElementsByClassName('swapBtn');
	var isSwapping = false;
	var statToSwap;
	var indexToSwap;
	
	var baseStats = 6; //excludes Comliness
	var fullStats = 7;
	
	//document.onkeypress=rollStats();
	
	/*
	---adding character class data---
	
	---format for adding classes---
	---class name in quotes---
	---minimum stats in parentheses---
	
	classNames.push("");
	classStats.push(new Array());
	
	*/
	
	classNames.push("Cleric");
	classStats.push(new Array(6,6,9,3,6,6));
	
	classNames.push("Druid");
	classStats.push(new Array(6,6,12,6,6,15));
	
	classNames.push("Fighter");
	classStats.push(new Array(9,3,6,6,7,6));
	
	classNames.push("Paladin (Players Handbook)");
	classStats.push(new Array(11,9,13,6,9,17));
	
	classNames.push("Ranger");
	classStats.push(new Array(12,13,14,6,14,6));
	
	classNames.push("Magic User");
	classStats.push(new Array(3,9,6,6,6,6));
	
	classNames.push("Illusionist");
	classStats.push(new Array(6,15,6,16,3,6));
	
	classNames.push("Thief");
	classStats.push(new Array(6,6,3,9,6,6));
	
	classNames.push("Assassin");
	classStats.push(new Array(11,11,6,12,6,3));
	
	classNames.push("Monk");
	classStats.push(new Array(15,6,15,15,11,6));
	
	classNames.push("Cavalier");
	classStats.push(new Array(15,10,10,15,15,3));
	
	classNames.push("Paladin (Unearthed Arcana)");
	classStats.push(new Array(15,10,13,15,15,17));
	
	classNames.push("Barbarian");
	classStats.push(new Array(15,3,3,14,15,3));
	
	classNames.push("Thief-Acrobat");
	classStats.push(new Array(15,6,3,16,6,6));
	
	classNames.push("Bard (Dragon Magazine)");
	classStats.push(new Array(9,15,12,16,6,15));
	
	var numClasses = classNames.length;
	
	
function rollStats() {
	for (j = 0; j < fullStats; j++) {
		stats[j] = bestOfFour();
		document.getElementById(j).innerHTML = stats[j];
	}
	getCom(stats[5]);
	rerolls++;
	checkClasses();
	statsAvg();
	if (rerolls===1){
		document.getElementById("rollBtn").innerHTML = "Reroll";
	}
}

function bestOfFour() {
	var tempStats = [];
	for (jj = 0; jj <= 4; jj++) {
			tempStats[jj] = randInt(1,6);
	}
	tempStats.sort(function(a, b){return b-a});
	return tempStats[0] + tempStats[1] + tempStats[2];
}

function getCom(cha){
	var chaMod = 0;
	if (cha > 18) chaMod = 5;
	else if (cha >= 18) chaMod = 3;
	else if (cha >= 16) chaMod = 2;
	else if (cha >= 13) chaMod = 1;
	else if (cha >= 9) chaMod = 0;
	else if (cha >= 6) chaMod = -1;
	else if (cha >= 4) chaMod = -2;
	else chaMod = -5;
	if (chaMod > 0)
	document.getElementById(baseStats).innerHTML = stats[baseStats] + "/" + (stats[baseStats] + chaMod) + " (+" + chaMod + " Charisma modifer)";
	else if (chaMod === 0)
	document.getElementById(baseStats).innerHTML = stats[baseStats]; //" (No Charisma modifer)";
	else if(chaMod < 0)
	document.getElementById(baseStats).innerHTML = stats[baseStats] + "/" + (stats[baseStats] + chaMod) + " (" + chaMod + " Charisma modifer)";
}

function checkClasses () {	
	var list = "This character can be a:</br>";
	for (k = 0; k < numClasses; k++){
		var isQualified = false;
		for (l = 0; l < baseStats; l++){
			if (stats[l] >= classStats[k][l]){
				isQualified = true;
			} else {
				isQualified = false;
				break;
			}
		}
		//the barbarian clause
		if (classNames[k] === "Barbarian" && (stats[2] > 15)) isQualified = false;
		if (isQualified) {
			list += classNames[k] + "</br>";
		}
	}
	if (rerolls < 2){
		list += "</br>" + "You have rolled " + rerolls + " character."
	} else {
		list += "</br>" + "You have rolled " + rerolls + " characters."
	}
	document.getElementById("classList").innerHTML = list;
}

function randInt (low, high){
	var randy;
	if (low >= 0){
		randy = Math.floor(Math.random() * ((high - low) + 1) + low); 
	} else {
		randy = Math.floor(Math.random() * ((high - low) + 1) + low);
	}
	return randy;
}

function rolld6s (dice){
	var roll = 0;
	for (i = 0; i < dice; i++){
		roll += randInt(1,6);
	}
	return roll;
}

function statsAvg () {
	var total = 0;
	for (statAvg = 0; statAvg < fullStats; statAvg++){
		total += stats[statAvg];
	}
	total /= stats.length; 
	avgTotal += total;
	document.getElementById("statAverages").innerHTML = "Average of Stats: " + total.toFixed(2) + "</br>Average Stat of all rolled characters: " + (avgTotal/rerolls).toFixed(2);
	
}

function swapStat(statIndex){
	var message ="";
	if (rerolls < 1) rollStats();
	if (isSwapping) {
		stats[indexToSwap] = stats[statIndex];
		stats[statIndex] = statToSwap;
		message = "Swap";
		isSwapping = false;
		statToSwap = "--";
	} else {
		indexToSwap = statIndex;
		statToSwap = stats[statIndex];
		stats[statIndex] = "--";
		message = "with...";
		isSwapping = true;	
	}
	for (swpMsg = 0; swpMsg < fullStats; swpMsg++) {
		swapBtns[swpMsg].innerHTML = message;
	}
	document.getElementById("curSwap").innerHTML = "Selected Stat: " + statToSwap;
	for (statRefresh = 0; statRefresh < fullStats; statRefresh++) {
		document.getElementById(statRefresh).innerHTML = stats[statRefresh];
	}
	if (!isSwapping) {
		getCom(stats[5]);
		checkClasses();
	}
}
