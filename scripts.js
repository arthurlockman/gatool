/*global moment */
/*global BootstrapDialog */
/*global Base64 */

//Create the localStorage variables if they don't exist
if (!localStorage.currentMatch) {
    localStorage.currentMatch = 1;
}
if (!localStorage.inPlayoffs) {
    localStorage.inPlayoffs = "false";
}
if (!localStorage.Alliances) {
    localStorage.Alliances = "{}";
}
if (!localStorage.events) {
    localStorage.events = "{}";
}
if (!localStorage.playoffList) {
    localStorage.playoffList = '{"Schedule":[]}';
}
if (!localStorage.qualsList) {
    localStorage.qualsList = '{"Schedule":[]}';
}
if (!localStorage.teamList) {
    localStorage.teamList = "{}";
}
if (!localStorage.eventName) {
    localStorage.eventName = "";
}
if (!localStorage.awardSeparator) {
    localStorage.awardSeparator = " || ";
}
if (!localStorage.awardDepth) {
    localStorage.awardDepth = 3;
}
if (!localStorage.showNotes) {
    localStorage.showNotes = "true";
}
if (!localStorage.showSponsors) {
    localStorage.showSponsors = "true";
}
if (!localStorage.showMottoes) {
    localStorage.showMottoes = "true";
}
if (!localStorage.showAwards) {
    localStorage.showAwards = "true";
}
if (!localStorage.showEventNames) {
    localStorage.showEventNames = "true";
}
if (!localStorage.offseason) {
    localStorage.offseason = "false";
}

// reset some of those variables, which will be adjusted later.
localStorage.clock = "ready";
localStorage.matchHighScore = 0;
localStorage.highScoreDetails = "{}";

// Cache the prior years events to reduce server calls.

localStorage.events2016 = '{"ABCA":"Western Canada Regional","ALHU":"Rocket City Regional","ARCHIMEDES":"FIRST Championship - Archimedes Subdivision","ARLR":"Arkansas Rock City Regional","ARTE":"FIRST Championship - ARTE Division","AUSY":"Australia Regional","AZFL":"Arizona North Regional","AZPX":"Arizona West Regional","CADA":"Sacramento Regional","CALB":"Los Angeles Regional","CAMA":"Central Valley Regional","CAPL":"Orange County Regional","CARSON":"FIRST Championship - Carson Subdivision","CARVER":"FIRST Championship - Carver Subdivision","CASD":"San Diego Regional","CASJ":"Silicon Valley Regional presented by Google.org","CAVE":"Ventura Regional","CHCMP":"FIRST Chesapeake District Championship sponsored by Booz Allen Hamilton","CMP":"FIRST Championship","CODE":"Colorado Regional","CTHAR":"NE District - Hartford Event","CTWAT":"NE District - Waterbury Event","CUCA":"FIRST Championship - CUCA Division","CURIE":"FIRST Championship - Curie Subdivision","FLOR":"Orlando Regional","FLWP":"South Florida Regional ","GAALB":"PCH District - Albany Event","GACA":"FIRST Championship - GACA Division","GACMP":"Peachtree District State Championship","GACOL":"PCH District - Columbus Event","GADAL":"PCH District - Dalton Event","GAKEN":"PCH District - Kennesaw Event","GALILEO":"FIRST Championship - Galileo Subdivision","HEAT":"Summer Heat","HIHO":"Hawaii Regional","HOPPER":"FIRST Championship - Hopper Subdivision","IACF":"Iowa Regional","IDBO":"Idaho Regional","ILCH":"Midwest Regional","ILPE":"Central Illinois Regional","INCMP":"Indiana State Championship","INPMH":"IN District - Perry Meridian Event","INWCH":"IN District - Walker Warren Event","INWLA":"IN District - Tippecanoe Event","IRI":"Indiana Robotics Invitational","ISTA":"Israel Regional","LAKE":"Bayou Regional","MABOS":"NE District - Boston Event","MANDA":"NE District - UMass-Dartmouth Event","MAREA":"NE District - North Shore Event","MAWOR":"NE District - WPI Event","MDBET":"CHS District - Greater DC Event","MDBLR":"CHS District - Northern Maryland Event","MDEDG":"CHS District - Central Maryland Event","MELEW":"NE District - Pine Tree Event","MIANN":"FIM District - Ann Arbor Skyline Event","MIBRO":"FIM District - Woodhaven Event","MICEN":"FIM District - Center Line Event","MICMP":"Michigan State Championship","MIESC":"FIM District - Escanaba Event","MIHOW":"FIM District - Howell Event","MIKE2":"FIM District - Kettering University Event #2","MIKEN":"FIM District - East Kentwood Event","MIKET":"FIM District - Kettering University Event #1","MILAK":"FIM District - Lakeview Event","MILAN":"FIM District - Lansing Event","MILIV":"FIM District - Livonia Event","MILSU":"FIM District - Lake Superior State University Event","MIMAR":"FIM District - Marysville Event","MIMID":"FIM District - Midland Event","MISJO":"FIM District - St. Joseph Event","MISOU":"FIM District - Southfield Event","MISTA":"FIM District - Standish-Sterling Event","MITRY":"FIM District - Troy Event","MITVC":"FIM District - Traverse City Event","MIWAT":"FIM District - Waterford Event","MIWMI":"FIM District - West Michigan Event","MNDU":"Lake Superior Regional","MNDU2":"Northern Lights Regional","MNMI":"Minnesota 10000 Lakes Regional","MNMI2":"Minnesota North Star Regional","MOKC":"Greater Kansas City Regional","MOSL":"St. Louis Regional","MRCMP":"Mid-Atlantic Robotics District Championship","MXMC":"Mexico City Regional ","NCASH":"NC District - UNC Asheville Event","NCBUI":"NC District - Campbell University/Johnston Community College Event","NCCMP":"NC FIRST Robotics State Championship","NCMCL":"NC District - Guilford County Event","NCRAL":"NC District - Wake County Event","NECMP":"New England District Championship","NEHO":"FIRST Championship - NEHO Division","NEWTON":"FIRST Championship - Newton Subdivision","NHDUR":"NE District - UNH Event","NHGRS":"NE District - Granite State Event","NJBRI":"MAR District - Bridgewater-Raritan Event","NJFLA":"MAR District - Mt. Olive Event","NJSKI":"MAR District - Montgomery Event","NJTAB":"MAR District - Seneca Event","NVLV":"Las Vegas Regional","NYLI":"SBPLI Long Island Regional","NYNY":"New York City Regional","NYRO":"Finger Lakes Regional ","NYTR":"New York Tech Valley Regional","OHCI":"Queen City Regional","OHCL":"Buckeye Regional","OKOK":"Oklahoma Regional ","ONNB":"North Bay Regional","ONTO":"Greater Toronto East Regional ","ONTO2":"Greater Toronto Central Regional","ONWA":"Waterloo Regional ","ONWI":"Windsor Essex Great Lakes Regional","ORORE":"PNW District - Clackamas Academy of Industrial Science Event","ORPHI":"PNW District - Philomath Event","ORWIL":"PNW District - Wilsonville Event","PACA":"Greater Pittsburgh Regional","PAHAT":"MAR District - Hatboro-Horsham Event","PAPHI":"MAR District - Springside Chestnut Hill Event","PAWCH":"MAR District - Westtown Event","PNCMP":"Pacific Northwest District Championship sponsored by Autodesk","QCMO":"FRC Festival de Robotique - Montreal Regional","RIPRO":"NE District - Rhode Island Event","SCMB":"Palmetto Regional","TESLA":"FIRST Championship - Tesla Subdivision","TNKN":"Smoky Mountains Regional","TXDA":"Dallas Regional","TXHO":"Lone Star Regional","TXLU":"Hub City Regional","TXSA":"Alamo Regional sponsored by Rackspace Hosting","UTWV":"Utah Regional","VABLA":"CHS District - Southwest Virginia Event","VADOS":"CHS District - Central Virginia Event","VAHAY":"CHS District - Northern Virginia Event","VAPOR":"CHS District - Hampton Roads Event","WAAHS":"PNW District - Auburn Event","WAAMV":"PNW District - Auburn Mountainview Event","WAELL":"PNW District - Central Washington University Event","WAMOU":"PNW District - Mount Vernon Event","WASNO":"PNW District - Glacier Peak Event","WASPO":"PNW District - West Valley Event","WEEK0":"Week 0","WIMI":"Wisconsin Regional","WVROX":"West Virginia ROX"}';
localStorage.events2017='{"ABCA":"Western Canada Regional","ALHU":"Rocket City Regional","ARCHIMEDES":"FIRST Championship - St. Louis - Archimedes Subdivision","ARDA":"FIRST Championship - St. Louis - ARDA Division","ARLI":"Arkansas Rock City Regional","AUSC":"Southern Cross Regional","AUSP":"South Pacific Regional","AZCMP":"Sanghi Foundation FRC AZ State Championship","AZFL":"Arizona North Regional","AZPX":"Arizona West Regional","BC18":"BattleCry 18","CADA":"Sacramento Regional","CAIR":"Orange County Regional","CALB":"Los Angeles Regional","CAMA":"Central Valley Regional","CANE":"FIRST Championship - Houston - CANE Division","CARSON":"FIRST Championship - St. Louis - Carson Subdivision","CARVER":"FIRST Championship - Houston - Carver Subdivision","CASD":"San Diego Regional presented by Qualcomm","CASF":"San Francisco Regional","CASJ":"Silicon Valley Regional","CATE":"FIRST Championship - St. Louis - CATE Division","CAVE":"Ventura Regional","CHCMP":"FIRST Chesapeake District Championship sponsored by Booz Allen Hamilton","CMPMO":"FIRST Championship - St. Louis","CMPTX":"FIRST Championship - Houston","CODE":"Colorado Regional","CTHAR":"NE District - Hartford Event","CTTD":"Cow Town ThrowDown","CTWAT":"NE District - Waterbury Event","CUDA":"FIRST Championship - St. Louis - CUDA Division","CURIE":"FIRST Championship - St. Louis - Curie Subdivision","DALY":"FIRST Championship - St. Louis - Daly Subdivision","DARWIN":"FIRST Championship - St. Louis - Darwin Subdivision","EMCC":"East Metro Collaborative Competition","FLOR":"Orlando Regional","FLWP":"South Florida Regional ","FOC":"Festival of Champions","FOC17":"Festival of Champions","GAALB":"PCH District - Albany Event","GACMP":"Peachtree State Championship","GACOL":"PCH District - Columbus Event","GADAL":"PCH District - Dalton Event","GAGAI":"PCH District - Gainesville Event","GALILEO":"FIRST Championship - Houston - Galileo Subdivision","GARO":"FIRST Championship - Houston - GARO Division","GGGT":"Gitchi Gummi Get-Together","GRITS":"Georgia Robotics Invitational Tournament & Showcase","GUSH":"Shenzhen Regional","HIHO":"Hawaii Regional","HOPPER":"FIRST Championship - Houston - Hopper Subdivision","HOTU":"FIRST Championship - Houston - HOTU Division","IACF":"Iowa Regional","IDBO":"Idaho Regional","ILCH":"Midwest Regional","ILPE":"Central Illinois Regional","INCMP":"Indiana State Championship","INMIS":"IN District - St. Joseph Event","INPMH":"IN District - Perry Meridian Event","INWLA":"IN District - Tippecanoe Event","IRI":"Indiana Robotics Invitational","IROC":"IROC","ISCMP":"FIRST Israel District Championship","ISDE1":"ISR District Event #1","ISDE2":"ISR District Event #2","ISDE3":"ISR District Event #3","ISDE4":"ISR District Event #4","LAKE":"Bayou Regional","MABOS":"NE District - Greater Boston Event","MABRI":"NE District - SE Mass Event","MAREA":"NE District - North Shore Event","MAWOR":"NE District - Worcester Polytechnic Institute Event","MDBET":"CHS District - Greater DC Event sponsored by Accenture","MDBOB":"Battle O’ Baltimore","MDEDG":"CHS District - Central Maryland Event sponsored by Leidos","MDOWI":"CHS District - Northern Maryland Event","MELEW":"NE District - Pine Tree Event","MEMS":"Mainely SPIRIT 7","MESH":"Summer Heat","MIANN":"FIM District - Ann Arbor Pioneer Event","MIBRO":"FIM District - Woodhaven Event","MICEN":"FIM District - Center Line Event","MICMP":"Michigan State Championship","MICMP1":"Michigan State Championship - Consumers Energy Division","MICMP2":"Michigan State Championship - Dow Division","MICMP3":"Michigan State Championship - DTE Energy Foundation Division","MICMP4":"Michigan State Championship - Ford Division","MIESC":"FIM District - Escanaba Event","MIGAY":"FIM District - Gaylord Event","MIGUL":"FIM District - Gull Lake Event","MIHOW":"FIM District - Howell Event","MIKE2":"FIM District - Kettering University Event #2","MIKEN":"FIM District - East Kentwood Event","MIKET":"FIM District - Kettering University Event #1","MILAK":"FIM District - Lakeview Event","MILAN":"FIM District - Lansing Event","MILIV":"FIM District - Livonia Event","MILSU":"FIM District - Lake Superior State University Event","MIMAR":"FIM District - Marysville Event","MIMID":"FIM District - Midland Event","MISHE":"FIM District - Shepherd Event","MISJO":"FIM District - St. Joseph Event","MISOU":"FIM District - Southfield Event","MITRY":"FIM District - Troy Event","MITVC":"FIM District - Traverse City Event","MIWAT":"FIM District - Waterford Event","MIWMI":"FIM District - West Michigan Event","MNCL":"Northern Minnesota Robotics Conference Tournament","MNCMP":"MSHSL FIRST State Robotics Championship","MNDU":"Lake Superior Regional","MNDU2":"Northern Lights Regional","MNMI":"Minnesota 10000 Lakes Regional","MNMI2":"Minnesota North Star Regional","MNRI":"Minnesota Robotics Invitational","MOKC":"Greater Kansas City Regional","MOSL":"St. Louis Regional","MRCMP":"FIRST Mid-Atlantic District Championship sponsored by Johnson & Johnson","MXTL":"Toluca Regional","MXTO":"Laguna Regional","NCASH":"NC District - UNC Asheville Event","NCCMP":"FIRST North Carolina State Championship","NCGRE":"NC District - Greensboro Event","NCRAL":"NC District - Raleigh Event","NCWIN":"NC District - Pitt County Event","NECMP":"New England District Championship","NEWTON":"FIRST Championship - Houston - Newton Subdivision","NHBED":"NE District - Southern NH Event","NHBOB":"Battle Of the Bay","NHGRS":"NE District - Granite State Event","NHRR":"RiverRage 21","NJBE":"Brunswick Eruption","NJBRI":"MAR District - Bridgewater-Raritan Event","NJFLA":"MAR District - Mount Olive Event","NJSKI":"MAR District - Montgomery Event","NJTAB":"MAR District - Seneca Event","NTTR":"North Texas Tournament of Robots","NVLV":"Las Vegas Regional","NYLI":"SBPLI Long Island Regional","NYNY":"New York City Regional","NYRO":"Finger Lakes Regional ","NYSU":"Hudson Valley Regional","NYTR":"New York Tech Valley Regional","OHCL":"Buckeye Regional","OHSP":"Miami Valley Regional","OKOK":"Oklahoma Regional ","ONBAR":"ONT District - Georgian College Event","ONCMP":"FIRST Ontario Provincial Championship","ONHA2":"STEMley Cup","ONHAM":"ONT District - McMaster University Event","ONLON":"ONT District - Western University, Engineering Event","ONNOB":"ONT District - North Bay Event","ONOSH":"ONT District - Durham College Event","ONTO1":"ONT District - Ryerson University Event","ONTO2":"ONT District - Victoria Park Collegiate Event","ONWAT":"ONT District - University of Waterloo Event","ONWIN":"ONT District - Windsor Essex Great Lakes Event","ORLAK":"PNW District - Lake Oswego Event","ORORE":"PNW District - Clackamas Academy of Industrial Science Event","ORWIL":"PNW District - Wilsonville Event","PACA":"Greater Pittsburgh Regional","PAHAT":"MAR District - Hatboro-Horsham Event","PAPHI":"MAR District - Springside Chestnut Hill Academy Event","PAWCH":"MAR District - Westtown Event","PNCMP":"Pacific Northwest District Championship","QCMO":"Festival de Robotique - Montreal Regional","R2OC":"Rock River Off-Season Competition","RIPRO":"NE District - Rhode Island Event","ROEBLING":"FIRST Championship - Houston - Roebling Subdivision","SCMB":"Palmetto Regional","TESLA":"FIRST Championship - St. Louis - Tesla Subdivision","TNKN":"Smoky Mountains Regional","TURING":"FIRST Championship - Houston - Turing Subdivision","TXDA":"Dallas Regional","TXHO":"Lone Star Central Regional","TXLU":"Hub City Regional","TXRI":"Texas Robotics Invitational","TXRR":"Texas Robot Roundup","TXSA":"Alamo Regional","TXTR":"The Remix","TXWA":"Brazos Valley Regional","TXWO":"Lone Star North Regional","UTWV":"Utah Regional","VABLA":"CHS District - Southwest Virginia Event","VAGLE":"CHS District - Central Virginia Event","VAHAY":"CHS District - Northern Virginia Event sponsored by Bechtel","VAPOR":"CHS District - Hampton Roads Event sponsored by Newport News Shipbuilding","WAAHS":"PNW District - Auburn Event","WAAMV":"PNW District - Auburn Mountainview Event","WAELL":"PNW District - Central Washington University Event","WAGG":"Washington Girls Generation","WAMOU":"PNW District - Mount Vernon Event","WAPP":"Peak Performance","WASNO":"PNW District - Glacier Peak Event","WASPO":"PNW District - West Valley Event","WEEK0":"Week 0","WILA":"Seven Rivers Regional","WIMI":"Wisconsin Regional"}';

//Set up the applicatton variables.
var playoffResults = {};
var matchLength = 150;
var autoLength = 15;
var endGame = 30;
localStorage.matchTimer = matchLength;
var allianceTeamList = [];
var allianceListUnsorted = [];
var allianceSelectionLength = 15;
var rankingsList = [];
var eventTeamList = [];
var eventQualsSchedule = [];
var eventPlayoffSchedule = [];
var allianceSelectionOrder = ["Alliance1Round1", "Alliance2Round1", "Alliance3Round1", "Alliance4Round1", "Alliance5Round1", "Alliance6Round1", "Alliance7Round1", "Alliance8Round1", "Alliance8Round2", "Alliance7Round2", "Alliance6Round2", "Alliance5Round2", "Alliance4Round2", "Alliance3Round2", "Alliance2Round2", "Alliance1Round2", "Alliance1Round3", "Alliance2Round3", "Alliance3Round3", "Alliance4Round3", "Alliance5Round3", "Alliance6Round3", "Alliance7Round3", "Alliance8Round3"];
var currentAllianceChoice = 0;
var allianceChoices = {};
var replacementAlliance = {};
var allianceChoicesUndo = [];
var allianceListUnsortedUndo = [];
var allianceTeamListUndo = [];
var teamNumberUndo = [];
var teamContainerUndo = [];
var teamAwardCalls = 0;
var teamUpdateCalls = 0;
var lastMatchPlayed = 0;
var allianceSelectionTableUndo = [];
var currentMatchData = {};
var teamCountTotal = 0;
var teamLoadProgressBar = 0;
var lastSchedulePage = false;
for (var i = 1; i < 9; i++) {
    allianceChoices['Alliance' + i + 'Captain'] = "";
}
for (var i = 0; i < allianceSelectionOrder.length; i++) {
    allianceChoices[allianceSelectionOrder[i]] = "";
}

//This heartbeat performs a number of functions related to clocks. See the timer() function for details.
var matchTimer = setInterval(function () {
    "use strict";
    timer();
}, 1000);

//Championship events receive special treatment. We define the Championshio events here, including Michigan.
var champSubdivisions = ["ARCHIMEDES", "CARSON", "CARVER", "CURIE", "DALY", "DARWIN", "GALILEO", "HOPPER", "NEWTON", "ROEBLING", "TESLA", "TURING"];
var champDivisions = ["ARDA", "CANE", "CATE", "CUDA", "GARO", "HOTU"];
var champs = ["CMP", "CMPTX", "CMPMO"];
var miDivisions = ["MICMP1", "MICMP2", "MICMP3", "MICMP4"];
var miChamps = ["MICMP"];

//The apiURL determines the endpoint for API calls. On the web, it's the site itself. In the mobile app, we need to declare the complete API URL.
var apiURL = "/api/";
//var apiURL = "https://gatool.jameslockman.com/api/";

//Now that we have the variables all set up and all of the necessary JS and CSS are loaded, we can run the app.
window.onload = function () {
    "use strict";
    
    $("#loadingFeedback").html("Loading core functions...");
    
    $("#loadingFeedback").html("Restoring settings...");
    
    $("#loadingFeedback").html("Enabling offseason support...");
    
    $("#loadingFeedback").html("Ready to play!");
    
    //hide the schedule progress bar. We'll show it if we need it.
    $('#scheduleProgressBar').hide();
    
    //change the Select Picker behavior to support Mobile browsers with native controls
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        $('.selectpicker').selectpicker('mobile');
    }
    
    //Set the controls to the previous selected values
    //Set currentYear value
    if (localStorage.currentYear) {
        document.getElementById("yearPicker" + localStorage.currentYear).selected = true;
        $("#yearPicker").selectpicker('refresh');
    }

    //Set awardSeparator value
    if (localStorage.awardSeparator === " || ") {
        document.getElementById("awardSeparator1").selected = true;
    } else if (localStorage.awardSeparator === " // ") {
        document.getElementById("awardSeparator2").selected = true;
    } else if (localStorage.awardSeparator === "<br>") {
        document.getElementById("awardSeparator3").selected = true;
    } else {
        localStorage.awardSeparator = "<br>";
        document.getElementById("awardSeparator3").selected = true;
    }
    $("#awardSeparatorPicker").selectpicker('refresh');

    //Set awardDepth value
    $("#awardDepthPicker").selectpicker('val', localStorage.awardDepth);

    //Configure the yearPicker function
    document.getElementById('yearPicker').onchange = function () {
        localStorage.currentYear = $("#yearPicker").val();
        localStorage.removeItem("eventSelector");
        loadEventsList();
        initEnvironment();
    };
    
    //configure the Event Selector function
    document.getElementById('eventSelector').onchange = function () {
        handleEventSelection();
    };

    //Setup the switches on the Setup Screen
    $("[name='showSponsors']").bootstrapSwitch('state', (localStorage.showSponsors === "true"));
    $("[name='showAwards']").bootstrapSwitch('state', (localStorage.showAwards === "true"));
    $("[name='showNotes']").bootstrapSwitch('state', (localStorage.showNotes === "true"));
    $("[name='showMottoes']").bootstrapSwitch('state', (localStorage.showMottoes === "true"));
    $("[name='showEventNames']").bootstrapSwitch('state', (localStorage.showEventNames === "true"));
    $("[name='offseason']").bootstrapSwitch('state', (localStorage.offseason === "true"));

    //Ensure that the switch values are honored.
    // Handle Sponsors toggle during loading.
    if ($("#showSponsors").bootstrapSwitch('state')) {
        $(".sponsors").show();
    } else {
        $(".sponsors").hide();
    }

    // Handle Awards toggle during loading.
    if ($("#showAwards").bootstrapSwitch('state')) {
        $(".awards").show();
    } else {
        $(".awards").hide();
    }

    // Handle Notes toggle during loading.
    if ($("#showNotes").bootstrapSwitch('state')) {
        $(".notes").show();
    } else {
        $(".notes").hide();
    }

    // Handle Mottoes toggle during loading.
    if ($("#showMottoes").bootstrapSwitch('state')) {
        $(".mottoes").show();
    } else {
        $(".mottoes").hide();
    }

    // Handle Event Names toggle during loading.
    if ($("#showEventNames").bootstrapSwitch('state')) {
        localStorage.showEventNames = "true";
    } else {
        localStorage.showEventNames = "false";
    }

    // Handle Offseason toggle in loading. Hide and show offseason annotations in the Setup/Schedule display.
    if ($("#offseason").bootstrapSwitch('state')) {
        $(".offseason").show();
        $(".regularseason").hide();
    } else {
        $(".offseason").hide();
        $(".regularseason").show();
    }


    // Handle Sponsors toggle. Hide and show sponsors in the announce/PBP display.
    document.getElementById("showSponsors").onchange = function () {
        localStorage.showSponsors = $("#showSponsors").bootstrapSwitch('state');
        if ($("#showSponsors").bootstrapSwitch('state')) {
            $(".sponsors").show();
        } else {
            $(".sponsors").hide();
        }
    };

    // Handle Awards toggle. Hide and show awards in the announce/PBP display.
    document.getElementById("showAwards").onchange = function () {
        localStorage.showAwards = $("#showAwards").bootstrapSwitch('state');
        if ($("#showAwards").bootstrapSwitch('state')) {
            $(".awards").show();
        } else {
            $(".awards").hide();
        }
    };


    // Handle Notes toggle. Hide and show Notes in the announce/PBP display.
    document.getElementById("showNotes").onchange = function () {
        localStorage.showNotes = $("#showNotes").bootstrapSwitch('state');
        if ($("#showNotes").bootstrapSwitch('state')) {
            $(".notes").show();
        } else {
            $(".notes").hide();
        }
    };


    // Handle Mottoes toggle. Hide and show mottoes in the announce/PBP display.
    document.getElementById("showMottoes").onchange = function () {
        localStorage.showMottoes = $("#showMottoes").bootstrapSwitch('state');
        if ($("#showMottoes").bootstrapSwitch('state')) {
            $(".mottoes").show();
        } else {
            $(".mottoes").hide();
        }
    };

    //Handle offseason toggle. Hide and show regular season items and offseason items, accordingly.
    document.getElementById("offseason").onchange = function () {
        localStorage.offseason = $("#offseason").bootstrapSwitch('state');
        if ($("#offseason").bootstrapSwitch('state')) {
            $(".offseason").show();
            $(".regularseason").hide();
        } else {
            $(".offseason").hide();
            $(".regularseason").show();
        }
        localStorage.removeItem("eventSelector");
        loadEventsList();
    };

    //Handle a change in awards depth
    document.getElementById('awardDepthPicker').onchange = function () {
        localStorage.awardDepth = $("#awardDepthPicker").val();
        loadEventsList();
        //initEnvironment();
    };

    //Handle a change in awards separator
    document.getElementById('awardSeparatorPicker').onchange = function () {
        if ($("#awardSeparatorPicker").val() === "||") {
            localStorage.awardSeparator = " || ";
        } else if ($("#awardSeparatorPicker").val() === "//") {
            localStorage.awardSeparator = " // ";
        } else {
            localStorage.awardSeparator = "<br>";
        }
        loadEventsList();
        //initEnvironment();
    };

    //Handle a change in Event Name Display
    document.getElementById('showEventNames').onchange = function () {
        if ($("#showEventNames").bootstrapSwitch('state')) {
            localStorage.showEventNames = "true";
        } else {
            localStorage.showEventNames = "false";
        }
        loadEventsList();
    };
    
    // Handle showEventNames toggle in loading. 
    if ($("#showEventNames").bootstrapSwitch('state')) {
        localStorage.showEventNames = "true";
    } else {
        localStorage.showEventNames = "false";
    }

    //Setup the Offseason schedule upload and reset buttons. See their respective fuctions for details.
    document.getElementById("QualsFiles").addEventListener('change', handleQualsFiles, false);
    document.getElementById("PlayoffFiles").addEventListener('change', handlePlayoffFiles, false);

    document.getElementById("QualsFilesReset").addEventListener('click', handleQualsFilesReset, false);
    document.getElementById("PlayoffFilesReset").addEventListener('click', handlePlayoffFilesReset, false);

    //setup the Offseason Tab
    $('#offseasonTeamListToJSON').click(function () {
        //Example: var parseOutput = CSVParser.parse(this.inputText, this.headersProvided, this.delimiter, this.downcaseHeaders, this.upcaseHeaders);
        console.log("starting conversion");
        var inbound = $("#offSeasonTeamListInput").val();
        var outbound = CSVParser.parse(inbound, true, "auto", false, false);
        if (outbound.errors) {
            alert("Errors in the input:\n" + outbound.errors);
        } else {
            //Example: jsonResult = JSON.parse(toJSON(outbound.dataGrid,outbound.headerNames,outbound.headerTypes,""));
            localStorage.teamList = toJSON(outbound.dataGrid, outbound.headerNames, outbound.headerTypes, "");
            eventTeamList = JSON.parse(localStorage.teamList);
            alert("Converted Result:\n" + localStorage.teamList);
            updateTeamTable();
        }

    });

    $('#allianceSelectionTable').hide();
    $('#allianceUndoButton').hide();
    
    //Load the events list based on the restored values
    loadEventsList();

    scaleRows();
    document.getElementById('setupTabPicker').click();

};

window.addEventListener("resize", scaleRows);

function initEnvironment() {
    "use strict";
    localStorage.currentMatch = 1;
    localStorage.inPlayoffs = "false";
    localStorage.Alliances = "{}";
    localStorage.events = "{}";
    localStorage.playoffList = '{"Schedule":[]}';
    localStorage.qualsList = '{"Schedule":[]}';
    localStorage.teamList = "{}";
    localStorage.clock = "ready";
    localStorage.matchHighScore = 0;
    localStorage.highScoreDetails = "{}";
    localStorage.allianceNoChange = "false";
    localStorage.showEventNames = "true";

    playoffResults = {};
    allianceTeamList = [];
    allianceListUnsorted = [];
    allianceSelectionLength = 15;
    rankingsList = [];
    currentAllianceChoice = 0;
    teamLoadProgressBar = 0;
    teamAwardCalls = 0;
    teamUpdateCalls = 0;
    teamCountTotal = 0;
    lastSchedulePage = false;
    $('#ranksContainer').html("No Rankings available.");
    $('#allianceSelectionTable').hide();
    $('#allianceUndoButton').hide();
}

function prepareAllianceSelection() {
    "use strict";
    allianceTeamList = [];
    allianceListUnsorted = [];
    rankingsList = [];
    // allianceSelectionOrder = ["Alliance1Round1", "Alliance2Round1", "Alliance3Round1", "Alliance4Round1", "Alliance5Round1", "Alliance6Round1", "Alliance7Round1", "Alliance8Round1", "Alliance8Round2", "Alliance7Round2", "Alliance6Round2", "Alliance5Round2", "Alliance4Round2", "Alliance3Round2", "Alliance2Round2", "Alliance1Round2"];
    currentAllianceChoice = 0;

    $("#allianceSelectionTable").html('<table> <tr> <td><table class="availableTeams"> <tr> <td colspan="5"><strong>Teams for Alliance Selection</strong></td></tr><tr> <td id="allianceTeamList1" class="col1"><div class="allianceTeam">List of teams</div></td><td id="allianceTeamList2" class="col1"><div class="allianceTeam">List of teams</div></td><td id="allianceTeamList3" class="col1"><div class="allianceTeam">List of teams</div></td><td id="allianceTeamList4" class="col1"><div class="allianceTeam">List of teams</div></td><td id="allianceTeamList5" class="col1"><div class="allianceTeam allianceCaptain">List of teams</div></td></tr></table></td><td class="col1"><table id="backupTeamsTable" class="backupAlliancesTable"> <tr> <td><p><strong>Backup Alliances</strong></p></td></tr><tr> <td><div class="allianceTeam" id="backupAllianceTeam1">List of teams</div></td></tr><tr> <td><div class="allianceTeam" id="backupAllianceTeam2">List of teams</div></td></tr><tr> <td><div class="allianceTeam" id="backupAllianceTeam3">List of teams</div></td></tr><tr> <td><div class="allianceTeam" id="backupAllianceTeam4">List of teams</div></td></tr><tr> <td><div class="allianceTeam" id="backupAllianceTeam5">List of teams</div></td></tr><tr> <td><div class="allianceTeam" id="backupAllianceTeam6">List of teams</div></td></tr><tr> <td><div class="allianceTeam" id="backupAllianceTeam7">List of teams</div></td></tr><tr> <td><div class="allianceTeam" id="backupAllianceTeam8">List of teams</div></td></tr></table></td><td><table class="alliancesTeamsTable"> <tr class="col6"> <td id="Alliance1" class="col3 dropzone"><div class="alliancedrop" id="Alliance1Captain">Alliance 1 Captain</div><div class="alliancedrop nextAllianceChoice" id="Alliance1Round1" >Alliance 1 first choice</div><div class="alliancedrop" id="Alliance1Round2" >Alliance 1 second choice</div><div class="alliancedrop thirdAllianceSelection" id="Alliance1Round3" >Alliance 1 third choice</div></td><td id="Alliance8" class="col3"><div class="alliancedrop" id="Alliance8Captain" >Alliance 8 Captain</div><div class="alliancedrop" id="Alliance8Round1" >Alliance 8 first choice</div><div class="alliancedrop" id="Alliance8Round2" >Alliance 8 second choice</div><div class="alliancedrop thirdAllianceSelection" id="Alliance8Round3" >Alliance 8 third choice</div></td></tr><tr class="col6"> <td id="Alliance2" class="col3"><div class="alliancedrop" id="Alliance2Captain" >Alliance 2 Captain</div><div class="alliancedrop" id="Alliance2Round1" >Alliance 2 first choice</div><div class="alliancedrop" id="Alliance2Round2" >Alliance 2 second choice</div><div class="alliancedrop thirdAllianceSelection" id="Alliance2Round3" >Alliance 2 third choice</div></td><td id="Alliance7" class="col3"><div class="alliancedrop" id="Alliance7Captain" >Alliance 7 Captain</div><div class="alliancedrop" id="Alliance7Round1" >Alliance 7 first choice</div><div class="alliancedrop" id="Alliance7Round2" >Alliance 7 second choice</div><div class="alliancedrop thirdAllianceSelection" id="Alliance7Round3" >Alliance 7 third choice</div></td></tr><tr class="col6"> <td id="Alliance3" class="col3"><div class="alliancedrop" id="Alliance3Captain" >Alliance 3 Captain</div><div class="alliancedrop" id="Alliance3Round1" >Alliance 3 first choice</div><div class="alliancedrop" id="Alliance3Round2" >Alliance 3 second choice</div><div class="alliancedrop thirdAllianceSelection" id="Alliance3Round3" >Alliance 3 third choice</div></td><td id="Alliance6" class="col3"><div class="alliancedrop" id="Alliance6Captain" >Alliance 6 Captain</div><div class="alliancedrop" id="Alliance6Round1" >Alliance 6 first choice</div><div class="alliancedrop" id="Alliance6Round2" >Alliance 6 second choice</div><div class="alliancedrop thirdAllianceSelection" id="Alliance6Round3" >Alliance 6 third choice</div></td></tr><tr class="col6"> <td id="Alliance4" class="col3"><div class="alliancedrop" id="Alliance4Captain" >Alliance 4 Captain</div><div class="alliancedrop" id="Alliance4Round1" >Alliance 4 first choice</div><div class="alliancedrop" id="Alliance4Round2" >Alliance 4 second choice</div><div class="alliancedrop thirdAllianceSelection" id="Alliance4Round3" >Alliance 4 third choice</div></td><td id="Alliance5" class="col3"><div class="alliancedrop" id="Alliance5Captain" >Alliance 5 Captain</div><div class="alliancedrop" id="Alliance5Round1" >Alliance 5 first choice</div><div class="alliancedrop" id="Alliance5Round2" >Alliance 5 second choice</div><div class="alliancedrop thirdAllianceSelection" id="Alliance5Round3" >Alliance 5 third choice</div></td></tr></table></td></tr></table>');

}

function handleEventSelection() {
    "use strict";
    $('#scheduleProgressBar').show();
    $('#scheduleContainer').html('No schedule available for this event.');
    $('#scheduleTabPicker').addClass('alert-danger');
    $('#ranksProgressBar').hide();
    $('#ranksContainer').html("No Rankings available.");
    $('#teamRanksPicker').addClass('alert-danger');
    $('#allianceSelectionTable').hide();
    $('#allianceUndoButton').hide();
    $("#allianceSelectionTabPicker").addClass("alert-danger");
    $("#teamloadprogress").show();
    $("#QualsFiles").show();
    $("#PlayoffFiles").show();
    $("#QualsFilesReset").hide();
    $("#PlayoffFilesReset").hide();
    clearFileInput("QualsFiles");
    clearFileInput("PlayoffFiles");
    document.getElementById("QualsFiles").addEventListener('change', handleQualsFiles, false);
    document.getElementById("PlayoffFiles").addEventListener('change', handlePlayoffFiles, false);


    eventTeamList = [];
    eventQualsSchedule = [];
    eventPlayoffSchedule = [];
    localStorage.currentMatch = 1;
    localStorage.playoffList = '{"Schedule":[]}';
    localStorage.qualsList = '{"Schedule":[]}';

    var e = document.getElementById('eventSelector');
    var data = JSON.parse(e.value);
    localStorage.eventSelector = data.code;
    localStorage.currentEvent = data.code;

    $('#eventCodeContainer').html(data.code);
    $('#eventLocationContainer').html(data.venue + "" + " in " + data.city + ", " + data.stateprov + " " + data.country);
    var startDate = moment(data.dateStart, 'YYYY-MM-DDTHH:mm:ss').format('dddd, MMMM Do');
    var endDate = moment(data.dateEnd, 'YYYY-MM-DDTHH:mm:ss').format('dddd, MMMM Do, YYYY');
    $("#eventDateContainer").html(startDate + " to " + endDate);
    $('#announceBanner').show();
    $('#announceDisplay').hide();
    $('#playByPlayBanner').show();
    $('#playByPlayDisplay').hide();
    $("#eventName").html('<span class="loadingEvent"><b>Waiting for event schedule... Team Data available.</b></span>');
    localStorage.eventName = data.name;
    localStorage.teamList = "";
    if (inChamps() || inSubdivision()) {
        allianceSelectionLength = 23;
    } else {
        allianceSelectionLength = 15;
    }
    getTeamList(localStorage.currentYear, 1);
    localStorage.matchHighScore = 0;
    localStorage.highScoreDetails = "";
    $("#eventName").html("<b>" + JSON.parse(document.getElementById("eventSelector").value).name + "</b>");
    $("#eventNameAllianceSelection").html("<b>" + localStorage.eventName + "</b><br>");
    $("#eventNameAwards").html("<b>" + localStorage.eventName + "</b><br>");
}

function handleOffseasonEventSelection() {
    "use strict";
    $('#scheduleProgressBar').show();
    $('#scheduleContainer').html('No schedule available for this event.');
    $('#scheduleTabPicker').addClass('alert-danger');
    $('#ranksProgressBar').hide();
    $('#ranksContainer').html("No Rankings available.");
    $('#teamRanksPicker').addClass('alert-danger');
    $('#allianceSelectionTable').hide();
    $('#allianceUndoButton').hide();
    $("#allianceSelectionTabPicker").addClass("alert-danger");
    $("#teamloadprogress").show();

    eventTeamList = [];
    eventQualsSchedule = [];
    eventPlayoffSchedule = [];
    localStorage.currentMatch = 1;
    localStorage.playoffList = '{"Schedule":[]}';
    localStorage.qualsList = '{"Schedule":[]}';

    var data = JSON.parse(localStorage.offseasonEventData);
    localStorage.eventSelector = "offseason";
    localStorage.currentEvent = "offseason";

    $('#eventCodeContainer').html(data.code);
    $('#eventLocationContainer').html(data.venue + "" + " in " + data.city + ", " + data.stateprov + " " + data.country);
    var startDate = moment(data.dateStart, 'YYYY-MM-DDTHH:mm:ss').format('dddd, MMMM Do');
    var endDate = moment(data.dateEnd, 'YYYY-MM-DDTHH:mm:ss').format('dddd, MMMM Do, YYYY');
    $("#eventDateContainer").html(startDate + " to " + endDate);
    $('#announceBanner').show();
    $('#announceDisplay').hide();
    $('#playByPlayBanner').show();
    $('#playByPlayDisplay').hide();
    $("#eventName").html('<span class="loadingEvent"><b>Waiting for event schedule... Team Data available.</b></span>');
    localStorage.eventName = data.name;
    localStorage.teamList = "";
    if (inChamps() || inSubdivision()) {
        allianceSelectionLength = 23;
    } else {
        allianceSelectionLength = 15;
    }
    getTeamList(localStorage.currentYear, 1);
    localStorage.matchHighScore = 0;
    localStorage.highScoreDetails = "";
    $("#eventName").html("<b>" + JSON.parse(document.getElementById("eventSelector").value).name + "</b>");
    $("#eventNameAllianceSelection").html("<b>" + localStorage.eventName + "</b><br>");
    $("#eventNameAwards").html("<b>" + localStorage.eventName + "</b><br>");
}


function loadEventsList() {
    "use strict";
    var e = document.getElementById('yearPicker');
    localStorage.currentYear = e.options[e.selectedIndex].value;
    $("#eventUpdateContainer").html("Loading event list...");
    var req = new XMLHttpRequest();
    var endpoint = "/events";
    if (localStorage.offseason === "true") {
        endpoint = "/offseasonevents";
    }
    req.open('GET', apiURL + localStorage.currentYear + endpoint);
    req.addEventListener('load', function () {
        var tmp = JSON.parse(req.responseText).Events;
        var options = [];
        var events = {};
        for (var i = 0; i < tmp.length; i++) {
            var _option = {
                text: tmp[i].name,
                value: tmp[i]
            };
            options.push(_option);
            events[tmp[i].code] = tmp[i].name;
        }
        options.sort(function (a, b) {
            if (a.text < b.text) {
                return -1;
            }
            if (a.text > b.text) {
                return 1;
            }
            return 0;
        });
        var sel = $('#eventSelector');
        sel.empty();
        $.each(options, function (index, option) {
            var optionClass = "";
            var optionPrefix = "";
            var optionPostfix = "";
            if (option.value.type === "OffSeasonWithAzureSync") {
                optionClass = "bg-info";
                optionPrefix = "•• ";
                optionPostfix = " ••";
            }
            sel.append($('<option></option>')
                .attr({
                    'value': JSON.stringify(option.value),
                    'class': optionClass,
                    'id': 'eventSelector' + option.value.code
                }).text(optionPrefix+option.text+optionPostfix));
        });
        if (!localStorage.eventSelector) {
            sel.selectpicker('refresh');
        } else {
            if (localStorage.eventSelector) {
                document.getElementById("eventSelector" + localStorage.eventSelector).selected = true;
            }
            sel.selectpicker('refresh');
        }

        localStorage.events = JSON.stringify(events);
        handleEventSelection();
        $("#eventUpdateContainer").html(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
    });
    req.send();
}

function getTeamUpdates(teamNumber) {
    "use strict";
    $('#teamDataTabPicker').addClass('alert-danger');
    var req = new XMLHttpRequest();
    req.open('GET', apiURL + 'getTeamUpdate/' + teamNumber);
    req.addEventListener('load', function () {
        var teamUpdates = JSON.parse(Base64.decode(req.responseText));
        var teamData = JSON.parse(localStorage["teamData" + teamNumber]);
        teamData.nameShortLocal = teamUpdates.nameShortLocal;
        teamData.cityStateLocal = teamUpdates.cityStateLocal;
        teamData.topSponsorsLocal = teamUpdates.topSponsorsLocal;
        teamData.sponsorsLocal = teamUpdates.sponsorsLocal;
        teamData.organizationLocal = teamUpdates.organizationLocal;
        teamData.robotNameLocal = teamUpdates.robotNameLocal;
        teamData.awardsLocal = teamUpdates.awardsLocal;
        teamData.teamMottoLocal = teamUpdates.teamMottoLocal;
        teamData.teamNotesLocal = teamUpdates.teamNotesLocal;
        localStorage["teamData" + teamNumber] = JSON.stringify(teamData);
        teamUpdateCalls--;
        if ((teamAwardCalls === 0) && (teamUpdateCalls === 0) && (lastSchedulePage)) {
            $('#teamDataTabPicker').removeClass('alert-danger');
            $('#teamDataTabPicker').addClass('alert-success');
            $('#teamloadprogress').hide();
            $('#teamProgressBar').hide();
            teamLoadProgressBar = 0;
            $('#teamloadprogressbar').attr("style", "width:" + (teamLoadProgressBar / teamCountTotal * 100) + "%");
            $('#teamProgressBarLoading').attr("style", "width:" + (teamLoadProgressBar / teamCountTotal * 100) + "%");

        }
    });
    req.send();
}

function sendTeamUpdates(teamNumber) {
    "use strict";
    $('#teamDataTabPicker').addClass('alert-danger');
    var req = new XMLHttpRequest();
    var teamUpdates = {};
    var teamData = JSON.parse(localStorage["teamData" + teamNumber]);
    teamUpdates.nameShortLocal = teamData.nameShortLocal;
    teamUpdates.cityStateLocal = teamData.cityStateLocal;
    teamUpdates.topSponsorsLocal = teamData.topSponsorsLocal;
    teamUpdates.sponsorsLocal = teamData.sponsorsLocal;
    teamUpdates.organizationLocal = teamData.organizationLocal;
    teamUpdates.robotNameLocal = teamData.robotNameLocal;
    teamUpdates.awardsLocal = teamData.awardsLocal;
    teamUpdates.teamMottoLocal = teamData.teamMottoLocal;
    teamUpdates.teamNotesLocal = teamData.teamNotesLocal;
    teamUpdates.source = getCookie("loggedin");
    req.open('GET', apiURL + 'putTeamUpdate/' + teamNumber + '/' + Base64.encode(JSON.stringify(teamUpdates)));
    req.addEventListener('load', function () {
        teamUpdateCalls--;
        if ((teamAwardCalls === 0) && (teamUpdateCalls === 0) && (lastSchedulePage)) {
            $('#teamDataTabPicker').removeClass('alert-danger');
            $('#teamDataTabPicker').addClass('alert-success');
            $('#teamloadprogress').hide();
            $('#teamProgressBar').hide();
            teamLoadProgressBar = 0;
            $('#teamloadprogressbar').attr("style", "width:" + (teamLoadProgressBar / teamCountTotal * 100) + "%");
            $('#teamProgressBarLoading').attr("style", "width:" + (teamLoadProgressBar / teamCountTotal * 100) + "%");

        }
    });
    req.send();
}

function getCookie(cname) {
    "use strict";
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function openTab(evt, tabID) {
    "use strict";

    // Get all elements with class="tabcontent" and hide them
    $(".tabcontent").hide();

    // Get all elements with class="tablinks" and remove the class "active"
    $(".tablinks").removeClass('active');

    // Show the current tab, and add an "active" class to the link that opened the tab
    $("#" + tabID).show();
    //document.getElementById(tabID).style.display = "block";
    //$("#" + evt.currentTarget).addClass("active");
    evt.currentTarget.className += " active";

    //resize the window
    scaleRows();
}

function getHybridSchedule() {
    "use strict";
    if (localStorage.offseason === "true") {
        getOffseasonSchedule();
    } else {
        getRegularSeasonSchedule();
    }

}

function getRegularSeasonSchedule() {
    "use strict";
    // inform the user that something is going to happen
    $("#scheduleUpdateContainer").html("Loading schedule data...");
    $('#scheduleTabPicker').addClass('alert-danger');
    var matchSchedule = "";
    var matchPicker = "";
    var qualScheduleLength = 0;
    lastMatchPlayed = 0;
    // Set up the API request for getting the Qualification and Playoff Schedules. When the Quals are loaded, an attempt is made to get the Playoffs.
    var req = new XMLHttpRequest();
    req.open('GET', apiURL + localStorage.currentYear + '/schedule/' + localStorage.currentEvent + '/qual');
    req.addEventListener('load', function () {
        var data = JSON.parse(req.responseText);
        //Ensure that there is a Quals schedule
        if (data.Schedule.length === 0) {
            $('#scheduleContainer').html('<b>No qualification matches have been scheduled for this event.</b>');
            localStorage.qualsList = '{"Schedule":[]}';
            localStorage.playoffList = '{"Schedule":[]}';
        } else {
            //we have a schedule. Create the table and display the schedule.
            $("#scheduleContainer").html('<p class = "eventName">' + localStorage.eventName + '</p><table id="scheduleTable" class="table table-bordered table-responsive table-striped"></table>');
            matchSchedule += '<thead class="thead-default"><tr><td class="col2"><b>Time</b></td><td  class="col2"><b>Description</b></td><td class="col1"><b>Match Number</b></td><td class="col1"><b>Score</b></td><td class="col1"><b>Station 1</b></td><td class="col1"><b>Station 2</b></td><td class="col1"><b>Station 3</b></td></tr></thead><tbody>';
            qualScheduleLength = data.Schedule.length;
            for (var i = 0; i < data.Schedule.length; i++) {
                var element = data.Schedule[i];
                matchSchedule += generateMatchTableRow(element);
                matchPicker += '<option id="matchPicker' + parseInt(i + 1) + '" matchNumber="' + parseInt(i + 1) + '">' + element.description + '</option>';
                if ((element.scoreRedFinal !== null) && (element.scoreBlueFinal !== null)) {
                    lastMatchPlayed = element.matchNumber;
                }
            }
            if (lastMatchPlayed >= qualScheduleLength - 1) {
                $('#allianceSelectionTabPicker').removeClass('alert-danger');
                $('#allianceSelectionTabPicker').addClass('alert-success');
            }
            localStorage.qualsList = JSON.stringify(data);
            $("#announceBanner, #playByPlayBanner").hide();
            $("#announceDisplay, #playByPlayDisplay").show();
            if (lastMatchPlayed >= data.Schedule.length - 1) {
                $("#allianceSelectionPlaceholder").hide();
                $("#allianceSelectionTable").show();
                $(".thirdAllianceSelection").hide();
                $("#backupTeamsTable").show();
                if (inChamps() || inSubdivision()) {
                    $(".thirdAllianceSelection").show();
                    $("#backupTeamsTable").hide();
                }
            }
            $('#scheduleTabPicker').removeClass('alert-danger');
            $('#scheduleTabPicker').addClass('alert-success');
        }

        // now fetch the playoff schedule
        $("#scheduleUpdateContainer").html(moment().format("dddd, MMMM Do YYYY, h:mm:ss a") + "... and looking for Playoff schedule...");
        req1.send();
    });
    var req1 = new XMLHttpRequest();
    req1.open('GET', apiURL + localStorage.currentYear + '/schedule/' + localStorage.currentEvent + '/playoff');
    req1.addEventListener('load', function () {
        $("#playoffScheduleAlert").show();
        var data = JSON.parse(req1.responseText);
        if (data.Schedule.length === 0) {
            document.getElementById('scheduleContainer').innerHTML += '<p><b>No playoff matches have been scheduled for this event.</b></p>';
            localStorage.playoffList = "";
            $("#matchPicker").html(matchPicker);
            if (document.getElementById("matchPicker" + localStorage.currentMatch)) {
                document.getElementById("matchPicker" + localStorage.currentMatch).selected = true;
            }
            $("#matchPicker").selectpicker('refresh');

        } else {
            for (var i = 0; i < data.Schedule.length; i++) {
                var element = data.Schedule[i];
                matchSchedule += generateMatchTableRow(element);
                matchPicker += '<option id="matchPicker' + parseInt(i + qualScheduleLength + 1) + '"  matchNumber="' + parseInt(i + qualScheduleLength + 1) + '">' + element.description + '</option>';
            }
            //$("#playoffScheduleAlert").hide();
            $("#matchPicker").html(matchPicker);
            document.getElementById("matchPicker" + localStorage.currentMatch).selected = true;
            $("#matchPicker").selectpicker('refresh');
            localStorage.inPlayoffs = "true";
            prepareAllianceSelection();
            if (lastMatchPlayed >= data.Schedule.length - 1) {
                $("#allianceSelectionPlaceholder").hide();
                $("#allianceSelectionTable").show();
                $(".thirdAllianceSelection").hide();
                $("#backupTeamsTable").show();
                if (inChamps() || inSubdivision()) {
                    $(".thirdAllianceSelection").show();
                    $("#backupTeamsTable").hide();
                }
            }
            //refresh the Game Announce and Play by Play displays and prepare to get the Playoff Schedule.
            getAllianceList();
        }
        if (matchSchedule) {
            document.getElementById('scheduleTable').innerHTML += matchSchedule;
        }
        $('#scheduleProgressBar').hide();
        localStorage.playoffList = JSON.stringify(data);
        $("#scheduleUpdateContainer").html(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
        if (matchSchedule) {announceDisplay();}

    });

    // Special case to support Championship Playoffs (Einstein and Michigan)
    var reqChamps = new XMLHttpRequest();
    reqChamps.open('GET', apiURL + localStorage.currentYear + '/schedule/' + localStorage.currentEvent + '/playoff');
    reqChamps.addEventListener('load', function () {
        var data = JSON.parse(reqChamps.responseText);
        //Ensure that there is a schedule
        if (data.Schedule.length === 0) {
            $('#scheduleContainer').html('<b>No matches have been scheduled for this event.</b>');
            localStorage.qualsList = '{"Schedule":[]}';
            localStorage.playoffList = '{"Schedule":[]}';
        } else {
            //we have a schedule. Create the table and display the schedule.
            $("#scheduleContainer").html('<p class = "eventName">' + localStorage.eventName + '</p><table id="scheduleTable" class="table table-bordered table-responsive table-striped"></table>');
            matchSchedule += '<thead class="thead-default"><tr><td class="col2"><b>Time</b></td><td  class="col2"><b>Description</b></td><td class="col1"><b>Match Number</b></td><td class="col1"><b>Score</b></td><td class="col1"><b>Station 1</b></td><td class="col1"><b>Station 2</b></td><td class="col1"><b>Station 3</b></td></tr></thead><tbody>';
            qualScheduleLength = data.Schedule.length;
            for (var i = 0; i < data.Schedule.length; i++) {
                var element = data.Schedule[i];
                matchSchedule += generateMatchTableRow(element);
                matchPicker += '<option id="matchPicker' + parseInt(i + 1) + '" matchNumber="' + parseInt(i + 1) + '">' + element.description + '</option>';
                if ((element.scoreRedFinal !== null) && (element.scoreBlueFinal !== null)) {
                    lastMatchPlayed = element.matchNumber;
                }
            }
            localStorage.qualsList = JSON.stringify(data);
            $("#announceBanner, #playByPlayBanner").hide();
            $("#announceDisplay, #playByPlayDisplay").show();

            $("#matchPicker").html(matchPicker);
            document.getElementById("matchPicker" + localStorage.currentMatch).selected = true;
            $("#matchPicker").selectpicker('refresh');
            localStorage.inPlayoffs = "true";

            //refresh the Game Announce and Play by Play displays and prepare to get the Playoff Schedule.

            $("#scheduleUpdateContainer").html(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
            $('#scheduleTabPicker').removeClass('alert-danger');
            $('#scheduleTabPicker').addClass('alert-success');
            // now finish off the playoff display
            if (matchSchedule) {
                document.getElementById('scheduleTable').innerHTML += matchSchedule;
            }
            $('#scheduleProgressBar').hide();
            localStorage.playoffList = '{"Schedule":[]}';
            $("#scheduleUpdateContainer").html(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
            displayAwardsTeams(allianceListUnsorted.slice(0));
            getAllianceList();

        }

    });


    //fetch the Qualification schedule first...
    if (inChamps() || (inMiChamps() && (localStorage.currentYear >= 2017))) {
        reqChamps.send();
    } else {
        req.send();
    }
}

function getOffseasonSchedule() {
    "use strict";
    // inform the user that something is going to happen
    $("#scheduleUpdateContainer").html("Loading schedule data...");
    $('#scheduleTabPicker').addClass('alert-danger');
    var matchSchedule = "";
    var matchPicker = "";
    var qualScheduleLength = 0;
    var i = 0;
    var element;
    var data;
    lastMatchPlayed = 0;
    // Set up the API request for getting the Qualification and Playoff Schedules. When the Quals are loaded, an attempt is made to get the Playoffs.
    data = JSON.parse(localStorage.qualsList);
    //Ensure that there is a schedule
    if (data.Schedule.length === 0) {
        $('#scheduleContainer').html('<b>No qualification matches have been scheduled for this event.</b>');
    } else {
        //we have a schedule. Create the table and display the schedule.
        $("#scheduleContainer").html('<p class = "eventName">' + localStorage.eventName + '</p><table id="scheduleTable" class="table table-bordered table-responsive table-striped"></table>');
        matchSchedule += '<thead class="thead-default"><tr><td class="col2"><b>Time</b></td><td  class="col2"><b>Description</b></td><td class="col1"><b>Match Number</b></td><td class="col1"><b>Score</b></td><td class="col1"><b>Station 1</b></td><td class="col1"><b>Station 2</b></td><td class="col1"><b>Station 3</b></td></tr></thead><tbody>';
        qualScheduleLength = data.Schedule.length;
        for (i = 0; i < data.Schedule.length; i++) {
            element = data.Schedule[i];
            matchSchedule += generateMatchTableRow(element);
            matchPicker += '<option id="matchPicker' + parseInt(i + 1) + '" matchNumber="' + parseInt(i + 1) + '">' + element.description + '</option>';
        }

        $("#announceBanner, #playByPlayBanner").hide();
        $("#announceDisplay, #playByPlayDisplay").show();
        $('#scheduleTabPicker').removeClass('alert-danger');
        $('#scheduleTabPicker').addClass('alert-success');
    }

    // now fetch the playoff schedule
    $("#scheduleUpdateContainer").html(moment().format("dddd, MMMM Do YYYY, h:mm:ss a") + "... and looking for Playoff schedule...");


    $("#playoffScheduleAlert").show();
    data = JSON.parse(localStorage.playoffList);
    if (data.Schedule.length === 0) {
        document.getElementById('scheduleContainer').innerHTML += '<p><b>No playoff matches have been scheduled for this event.</b></p>';
        $("#matchPicker").html(matchPicker);
        if (document.getElementById("matchPicker" + localStorage.currentMatch)) {
            document.getElementById("matchPicker" + localStorage.currentMatch).selected = true;
        }
        $("#matchPicker").selectpicker('refresh');

    } else {
        for (i = 0; i < data.Schedule.length; i++) {
            element = data.Schedule[i];
            matchSchedule += generateMatchTableRow(element);
            matchPicker += '<option id="matchPicker' + parseInt(i + qualScheduleLength + 1) + '"  matchNumber="' + parseInt(i + qualScheduleLength + 1) + '">' + element.description + '</option>';
        }
        //$("#playoffScheduleAlert").hide();
        $("#matchPicker").html(matchPicker);
        document.getElementById("matchPicker" + localStorage.currentMatch).selected = true;
        $("#matchPicker").selectpicker('refresh');
        localStorage.inPlayoffs = "true";

    }
    if (matchSchedule) {
        document.getElementById('scheduleTable').innerHTML += matchSchedule;
    }
    $('#scheduleProgressBar').hide();
    $("#scheduleUpdateContainer").html(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
    announceDisplay();
}



function handleMatchSelection(element) {
    "use strict";
    var matchNumberSelected = $(element).children(":selected").attr("matchNumber");
    localStorage.currentMatch = matchNumberSelected;
    document.getElementById("matchPicker" + localStorage.currentMatch).selected = true;
    $("#matchPicker").selectpicker('refresh');
    updateMatchResults();
}

function updateTeamTable(sortColumn) {
    "use strict";
    //var teamData = JSON.parse(localStorage.teamList);
    var teamData = eventTeamList.slice(0);
    if (sortColumn === "Rank") {
        teamData.sort(function (a, b) {
            if (a.Rank < b.Rank) {
                return -1;
            }
            if (a.Rank > b.Rank) {
                return 1;
            }
            return 0;
        });
    }

    $('#teamsContainer').html('<p class = "eventName">' + localStorage.eventName + '</p><p>This table is editable. Tap on a team number to change data for a specific team. Edits you make are local to this browser, and they will persist here if you do not clear your browser cache. You can save your changes to the gatool Cloud on the team details page or on the Setup Screen. Cells <span class="bg-success"> highlighted in green</span> have been modified, either by you or by other gatool users. </p><table id="teamsTable" class="table table-condensed table-responsive table-bordered table-striped"></table>');
    var teamList = '<thead  id="teamsTableHead" class="thead-default"><tr><td class="col1"><b>Team #</b></td><td class="col1"><b>Rank</b></td><td class="col2"><b>Team Name</b></td><td class="col2"><b>City</b></td><td class="col2"><b>Top 5 Sponsors</b></td><td  class="col2"><b>Organization</b></td><td class="col1"><b>Rookie Year</b></td><td class="col1"><b>Robot name</b></td></tr></thead><tbody>';
    for (var i = 0; i < teamData.length; i++) {
        var element = teamData[i];
        teamList += updateTeamTableRow(element);
    }
    $('#teamsTable').html(teamList + "</tbody>");
    $('<p><button type="button" id="billAucoinNuclearOption" class="btn btn-danger" onclick="resetAwards()">Reset stored awards to their TIMS values</button></p>').insertAfter('#teamsTable');

}

function getTeamList(year, pageNumber) {
    "use strict";
    $("#teamDataTabPicker").addClass("alert-danger");
    $("#teamUpdateContainer").html("Loading team data...");

    var req = new XMLHttpRequest();
    var endpoint = "/teams/";
    if (localStorage.offseason === "true") {
        endpoint = "/offseasonteams/";
    }
    req.open('GET', apiURL + year + endpoint + localStorage.currentEvent + '/' + pageNumber);
    req.addEventListener('load', function () {
        var data = "";
        $('#teamloadprogress').show();
        $('#teamProgressBar').show();
        if (req.responseText.includes('"teams":')) {
            data = JSON.parse(req.responseText);
        } else {
            data = JSON.parse('{"teams":[],"teamCountTotal":0,"teamCountPage":0,"pageCurrent":0,"pageTotal":0}');
        }
        if (data.teams.length === 0 && pageNumber === 1) {
            $('#teamsContainer').html('<b>No teams have registered for this event.</b>');
            $("#eventTeamCount").html(data.teamCountTotal);
            teamCountTotal = data.teamCountTotal;
            localStorage.teamList = "";
        } else {
            var teamList = "";
            if (pageNumber === 1) {
                $("#eventTeamCount").html(data.teamCountTotal);
                teamCountTotal = data.teamCountTotal * $('#awardDepthPicker').val();

                $('#teamsContainer').html('<p class = "eventName">' + localStorage.eventName + '</p><p>This table is editable. Tap on a team number to change data for a specific team. Edits you make are local to this browser, and they will persist here if you do not clear your browser cache. You can save your changes to the gatool Cloud on the team details page or on the Setup Screen. Cells <span class="bg-success"> highlighted in green</span> have been modified, either by you or by other gatool users. </p><table id="teamsTable" class="table table-condensed table-responsive table-bordered table-striped"></table><p><button type="button" id="billAucoinNuclearOption" class="btn btn-danger" onclick="resetAwards()">Reset stored awards to their TIMS values</button></p>');
                teamList += '<thead  id="teamsTableHead" class="thead-default"><tr><td class="col1"><b>Team #</b></td><td class="col1"><b>Rank</b></td><td class="col2"><b>Team Name</b></td><td class="col2"><b>City</b></td><td class="col2"><b>Top 5 Sponsors</b></td><td  class="col2"><b>Organization</b></td><td class="col1"><b>Rookie Year</b></td><td class="col1"><b>Robot name</b></td></tr></thead><tbody>';
            }

            for (var i = 0; i < data.teams.length; i++) {
                var element = data.teams[i];
                teamList += generateTeamTableRow(element);
                eventTeamList.push(data.teams[i]);
            }
            if (pageNumber === 1) {
                $('#teamsTable').html(teamList + "</tbody>");
            } else {
                $('#teamsTable').append(teamList);
            }

            //clear out old rank data for the teams we've loaded
            for (var j = 0; j < eventTeamList.length; j++) {
                var team = JSON.parse(localStorage['teamData' + eventTeamList[j].teamNumber]);

                team.rank = "";
                team.alliance = "";
                team.allianceName = "";
                team.allianceChoice = "";
                team.sortOrder1 = "";
                team.sortOrder2 = "";
                team.sortOrder3 = "";
                team.sortOrder4 = "";
                team.sortOrder5 = "";
                team.sortOrder6 = "";
                team.wins = "";
                team.losses = "";
                team.ties = "";
                team.qualAverage = "";
                team.dq = "";
                team.matchesPlayed = "";
                team.lastVisit = "No recent visit";

                localStorage['teamData' + eventTeamList[j].teamNumber] = JSON.stringify(team);
            }

            if (data.pageCurrent < data.pageTotal) {
                lastSchedulePage = false;
                getTeamList(year, parseInt(pageNumber) + 1);
            } else {
                localStorage.teamList = JSON.stringify(eventTeamList);
                getHybridSchedule();
                displayAwardsTeams();
                lastSchedulePage = true;
            }
        }

        $("#teamUpdateContainer").html(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
        //$("#teamDataTabPicker").removeClass("alert-danger");
        //$("#teamDataTabPicker").addClass("alert-success");
    });
    req.send();

}

function getAllianceList() {
    "use strict";
    $("#allianceUpdateContainer").html("Loading Alliance data...");
    var req2 = new XMLHttpRequest();
    req2.open('GET', apiURL + localStorage.currentYear + '/alliances/' + localStorage.currentEvent);
    req2.addEventListener('load', function () {
        var data = JSON.parse(req2.responseText);
        if (data.Alliances.length === 0) {
            $('#allianceUpdateContainer').html('<b>No Playoff Alliance data available for this event.</b>');
            localStorage.Alliances = {};
        } else {
            localStorage.Alliances = JSON.stringify(data);
            for (var i = 0; i < data.Alliances.length; i++) {
                var element = data.Alliances[i];
                var team = {};
                if (element.captain !== null) {
                    team = JSON.parse(localStorage["teamData" + element.captain]);
                    team.alliance = element.number;
                    team.allianceName = element.name;
                    team.allianceChoice = "Captain";
                    localStorage["teamData" + element.captain] = JSON.stringify(team);
                }
                if (element.round1 !== null) {
                    team = JSON.parse(localStorage["teamData" + element.round1]);
                    team.alliance = element.number;
                    team.allianceName = element.name;
                    team.allianceChoice = "Round 1 Selection";
                    localStorage["teamData" + element.round1] = JSON.stringify(team);
                }
                if (element.round2 !== null) {
                    team = JSON.parse(localStorage["teamData" + element.round2]);
                    team.alliance = element.number;
                    team.allianceName = element.name;
                    team.allianceChoice = "Round 2 Selection";
                    localStorage["teamData" + element.round2] = JSON.stringify(team);
                }
                if (element.round3 !== null) {
                    team = JSON.parse(localStorage["teamData" + element.round3]);
                    team.alliance = element.number;
                    team.allianceName = element.name;
                    team.allianceChoice = "Round 3 Selection";
                    localStorage["teamData" + element.round3] = JSON.stringify(team);
                }
                if (element.backup !== null) {
                    team = JSON.parse(localStorage["teamData" + element.backup]);
                    team.alliance = element.number;
                    team.allianceName = element.name;
                    team.allianceChoice = "Backup Robot replacing " + element.backupReplaced;
                    localStorage["teamData" + element.backup] = JSON.stringify(team);
                }
            }
        }
        if ($("#announceDisplay").css("display") !== "none") {
            announceDisplay();
        }
        $("#allianceUpdateContainer").html(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
    });
    if (localStorage.inPlayoffs === "true") {
        req2.send();
    } else {
        if ($("#announceDisplay").css("display") !== "none") {
            announceDisplay();
        }
    }
}

function updateMatchResults() {
    "use strict";
    getHybridSchedule();
    document.getElementById("matchPicker" + localStorage.currentMatch).selected = true;
    $("#matchPicker").selectpicker('refresh');
}

function getNextMatch() {
    "use strict";
    var qualsList = JSON.parse(localStorage.qualsList);
    var playoffList = JSON.parse(localStorage.playoffList);
    replacementAlliance = {};
    if (!qualsList) {
        $("#matchNumber").html("No matches scheduled.");
    } else {
        localStorage.currentMatch++;
        if (localStorage.currentMatch > qualsList.Schedule.length + playoffList.Schedule.length) {
            localStorage.currentMatch = qualsList.Schedule.length + playoffList.Schedule.length;
        }
        announceDisplay();
        updateMatchResults();
    }
}

function getPreviousMatch() {
    "use strict";
    replacementAlliance = {};
    localStorage.currentMatch--;
    if (localStorage.currentMatch < 1) {
        localStorage.currentMatch = 1;
    }
    announceDisplay();
    updateMatchResults();
}

function scaleRows() {
    "use strict";
    var height = window.innerHeight;
    var width = window.innerWidth - 30;
    var col1width = width / 12;
    var col2width = width / 6;
    var col3width = width / 4;
    var col4width = width / 3;
    var col5width = width / 12 * 5;
    var col6width = width / 2;
    var col9width = width / 4 * 3;
    var col10width = width / 6 * 5;
    var verticalDivisions = 3;
    if (inChamps() || (inSubdivision() && (localStorage.currentMatch > JSON.parse(localStorage.qualsList).Schedule.length))) {
        verticalDivisions = 4;
    }
    var announceHeight = Math.round((height - $("#navbar").outerHeight() - $("#appTab").outerHeight() - $("#gameButtonsAnnounce").outerHeight() - $("#footer").outerHeight() - $("#announceTableHeader").outerHeight()) / (verticalDivisions * 2) - 10);
    var playByPlayHeight = Math.round((height - $("#navbar").outerHeight() - $("#appTab").outerHeight() - $("#gameButtonsPlayByPlay").outerHeight() - $("#footer").outerHeight() - $("#announceTableHeader").outerHeight()) / verticalDivisions - 25);
    $(".redAlliancePlayByPlay,.blueAlliancePlayByPlay").css("height", playByPlayHeight + "px");
    $(".redAlliance,.blueAlliance").css("height", announceHeight + "px");
    $(".col1").css("width", col1width + "px");
    $(".col2").css("width", col2width + "px");
    $(".col3").css("width", col3width + "px");
    $(".col4").css("width", col4width + "px");
    $(".col5").css("width", col5width + "px");
    $(".col6").css("width", col6width + "px");
    $(".col9").css("width", col9width + "px");
    $(".col10").css("width", col10width + "px");
    $(".spacer").css("height", ($("#navbar").outerHeight() - 35) + "px");
}


function announceDisplay() {
    "use strict";
    var qualsList = JSON.parse(localStorage.qualsList);
    var currentMatch = localStorage.currentMatch - 1;
    var teamCount = 6;
    if (localStorage.currentMatch > qualsList.Schedule.length) {
        currentMatch = localStorage.currentMatch - qualsList.Schedule.length - 1;
        qualsList = JSON.parse(localStorage.playoffList);
    }
    currentMatchData = qualsList.Schedule[currentMatch];

    var stationList = ["red1", "red2", "red3", "blue1", "blue2", "blue3", "red4", "blue4"];
    var redTeams = [];
    var blueTeams = [];
    var alliances = JSON.parse(localStorage.Alliances).Alliances;
    var redAlliance = {};
    var blueAlliance = {};
    getTeamRanks();
    $(".champsDisplay").hide();
    if (inChamps() || (inSubdivision() && (localStorage.currentMatch > qualsList.Schedule.length))) {
        teamCount = 8;
        $(".champsDisplay").show();
        var red1 = currentMatchData.teams[0].teamNumber;
        var blue1 = currentMatchData.teams[3].teamNumber;
        redAlliance = $.grep(alliances, function (element, index) {
            return (element.captain === red1 || element.round1 === red1 || element.round2 === red1 || element.round3 === red1 || element.backup === red1);
        });
        redTeams = [redAlliance[0].captain, redAlliance[0].round1, redAlliance[0].round2, redAlliance[0].round3, redAlliance[0].backup];

        blueAlliance = $.grep(alliances, function (element, index) {
            return (element.captain === blue1 || element.round1 === blue1 || element.round2 === blue1 || element.round3 === blue1 || element.backup === blue1);
        });
        blueTeams = [blueAlliance[0].captain, blueAlliance[0].round1, blueAlliance[0].round2, blueAlliance[0].round3, blueAlliance[0].backup];
    }

    if ((currentMatchData.description.split(" ")[0] !== "Qualification") && (currentMatchData.description.split(" ")[0] !== "Einstein") && (Number(localStorage.currentYear) >= 2017)) {
        $("#matchNameAnnounce").html(parsePlayoffMatchName(currentMatchData.description));
        $("#topMatchNameAnnounce").html(localStorage.eventName + "<br>" + parsePlayoffMatchName(currentMatchData.description));
        $("#matchName").html(parsePlayoffMatchName(currentMatchData.description));
        $("#topMatchNamePlayByPlay").html(parsePlayoffMatchName(currentMatchData.description));

    } else {
        $("#matchNameAnnounce").html("<b>" + currentMatchData.description + " of " + qualsList.Schedule.length + "</b>");
        $("#topMatchNameAnnounce").html("<b>" + localStorage.eventName + "<br>" + currentMatchData.description + " of " + qualsList.Schedule.length + "</b>");
        $("#matchName").html("<b>" + currentMatchData.description + " of " + qualsList.Schedule.length + "</b>");
        $("#topMatchNamePlayByPlay").html("<b>" + currentMatchData.description + " of " + qualsList.Schedule.length + "</b>");
    }
    $("#eventHighScorePlayByPlay").html("<b>Current High Score: " + localStorage.matchHighScore + "<br>from " + localStorage.highScoreDetails + "</b>");

    function checkTeam(element) {
        return element !== currentMatchData.teams[ii].teamNumber;
    }

    for (var ii = 0; ii < teamCount; ii++) {
//        var missingTeam = (localStorage['teamData' + currentMatchData.teams[ii].teamNumber] || false);
//        if (missingTeam) {

        if (ii < 3) {
            redTeams = redTeams.filter(checkTeam);
        }
        if (ii < 6 && ii > 2) {
            blueTeams = blueTeams.filter(checkTeam);
        }
        if (ii === 6) {
            currentMatchData.teams[ii] = {
                "teamNumber": redTeams[0]
            };
        }
        if (ii === 7) {
            currentMatchData.teams[ii] = {
                "teamNumber": blueTeams[0]
            };
        }
        var teamData = JSON.parse(localStorage['teamData' + currentMatchData.teams[ii].teamNumber]);
        $('#' + stationList[ii] + 'TeamNumber').html("<b>" + currentMatchData.teams[ii].teamNumber + "</b>");
        $('#' + stationList[ii] + 'PlaybyPlayteamNumber').html(currentMatchData.teams[ii].teamNumber);
        if ((localStorage.currentMatch > qualsList.Schedule.length) || inChamps() || (inMiChamps() && (localStorage.currentYear >= 2017))) {
            document.getElementById(stationList[ii] + 'TeamNumber').setAttribute("onclick", "replaceTeam('" + stationList[ii] + "','" + currentMatchData.teams[ii].teamNumber + "')");
            document.getElementById(stationList[ii] + 'PlaybyPlayteamNumber').setAttribute("onclick", "replaceTeam('" + stationList[ii] + "','" + currentMatchData.teams[ii].teamNumber + "')");
        } else {
            document.getElementById(stationList[ii] + 'TeamNumber').setAttribute("onclick", "");
            document.getElementById(stationList[ii] + 'PlaybyPlayteamNumber').setAttribute("onclick", "");
        }

        if (replacementAlliance[stationList[ii]]) {
            teamData = JSON.parse(localStorage['teamData' + replacementAlliance[stationList[ii]]]);
            $('#' + stationList[ii] + 'TeamNumber').html("<b>" + replacementAlliance[stationList[ii]] + "</b>");
            $('#' + stationList[ii] + 'PlaybyPlayteamNumber').html(replacementAlliance[stationList[ii]]);
        }
        $('#' + stationList[ii] + 'RookieYear').html(rookieYearDisplay(teamData.rookieYear));

        if ((localStorage.currentMatch > JSON.parse(localStorage.qualsList).Schedule.length) || inChamps() || (inMiChamps() && (localStorage.currentYear >= 2017))) {
            $('#' + stationList[ii] + 'Alliance').html(teamData.allianceName + "<br>" + teamData.allianceChoice);
            $('#' + stationList[ii] + 'PlayByPlayAlliance').html("<p><b>" + teamData.allianceName + "<br>" + teamData.allianceChoice + "<b></p>");
        } else {
            $('#' + stationList[ii] + 'Alliance').html("");
            $('#' + stationList[ii] + 'PlayByPlayAlliance').html("");
        }
        if (teamData.nameShortLocal === "") {
            $("#" + stationList[ii] + "TeamName").html(teamData.nameShort);
        } else {
            $("#" + stationList[ii] + "TeamName").html(teamData.nameShortLocal);
        }
        if (teamData.cityStateLocal === "") {
            $("#" + stationList[ii] + "CityState").html(teamData.cityState);
        } else {
            $("#" + stationList[ii] + "CityState").html(teamData.cityStateLocal);
        }
        if (teamData.robotNameLocal === "") {
            $("#" + stationList[ii] + "RobotName").html(teamData.robotName);
        } else {
            $("#" + stationList[ii] + "RobotName").html(teamData.robotNameLocal);
        }
        if (teamData.organizationLocal === "") {
            $("#" + stationList[ii] + "Organization").html(teamData.organization);
        } else {
            $("#" + stationList[ii] + "Organization").html(teamData.organizationLocal);
        }
        if (teamData.topSponsorsLocal === "") {
            $("#" + stationList[ii] + "Sponsors").html(teamData.topSponsors);
        } else {
            $("#" + stationList[ii] + "Sponsors").html(teamData.topSponsorsLocal);
        }
        if (teamData.awardsLocal === "") {
            $("#" + stationList[ii] + "Awards").html(teamData.awards);
        } else {
            $("#" + stationList[ii] + "Awards").html(teamData.awardsLocal);
        }

        $("#" + stationList[ii] + "Rank").html(teamData.rank);
        // Swap the stats for the Alliance name if we're in Champs or in Michigan Champs
        if (inChamps() || (inMiChamps() && (localStorage.currentYear >= 2017)) || (inSubdivision() && (localStorage.currentMatch > qualsList.Schedule.length))) {
            $('#' + stationList[ii] + 'PlayByPlayAlliance').html("");
            $("#" + stationList[ii] + "WinLossTie").html("<p class='playByPlayChampsAlliance'>" + teamData.allianceName + "<br>" + teamData.allianceChoice + "</p>");
            rankHighlight(stationList[ii] + "Rank", teamData.rank);
        } else {
            $("#" + stationList[ii] + "WinLossTie").html("<table class='wltTable'><tr><td id='" + stationList[ii] + "PlayByPlayRank' class='wltCol'>Rank " + teamData.rank + "<br>AV RP " + teamData.sortOrder1 + "</td><td class='wltCol'>Qual Avg<br>" + teamData.qualAverage + "</td><td class='wltCol'>W-L-T<br>" + teamData.wins + "-" + teamData.losses + "-" + teamData.ties + "</td></tr></table>");
            rankHighlight(stationList[ii] + "PlayByPlayRank", teamData.rank);
            rankHighlight(stationList[ii] + "Rank", teamData.rank);
        }


        if (teamData.nameShortLocal === "") {
            $('#' + stationList[ii] + 'PlaybyPlayTeamName').html(teamData.nameShort);
        } else {
            $('#' + stationList[ii] + 'PlaybyPlayTeamName').html(teamData.nameShortLocal);
        }
        if (teamData.robotNameLocal === "") {
            $('#' + stationList[ii] + 'PlaybyPlayRobotName').html(teamData.robotName);
        } else {
            $('#' + stationList[ii] + 'PlaybyPlayRobotName').html(teamData.robotNameLocal);
        }
        if (teamData.cityStateLocal === "") {
            $("#" + stationList[ii] + "PlayByPlayCity").html(teamData.cityState);
        } else {
            $("#" + stationList[ii] + "PlayByPlayCity").html(teamData.cityStateLocal);
        }
        if (teamData.organizationLocal === "") {
            $("#" + stationList[ii] + "PlayByPlayOrganization").html(teamData.organization);
        } else {
            $("#" + stationList[ii] + "PlayByPlayOrganization").html(teamData.organizationLocal);
        }
        if (teamData.teamMottoLocal === "") {
            $("#" + stationList[ii] + "PlayByPlayMotto").html("");
        } else {
            $("#" + stationList[ii] + "PlayByPlayMotto").html('Motto: "' + teamData.teamMottoLocal + '"');
        }
        if (teamData.teamNotesLocal === "") {
            $("#" + stationList[ii] + "Notes").html("");
            $("#" + stationList[ii] + "PlaybyPlayNotes").html("");
        } else {
            $("#" + stationList[ii] + "Notes").html('Notes: "' + teamData.teamNotesLocal + '"');
            $("#" + stationList[ii] + "PlaybyPlayNotes").html('Notes: "' + teamData.teamNotesLocal + '"');
        }
//        } else {
//        console.log("missing team: "+currentMatchData.teams[ii].teamNumber);
//        getTeamData(currentMatchData.teams[ii],localStorage.currentYear);}
//    }
}}

function replaceTeam(station, originalTeam) {
    "use strict";
    var replacementTeam = originalTeam;
    var message = "You are about to replace Alliance team <b>" + originalTeam + "</b> for another team.<br>";
    message += "This is a one-time replacement, since the substitution will be recorded at FIRST when the match ends and the score is committed.";
    message += '<div id = "substituteTeamInput" class="form-group"><label for="substituteTeamUpdate">Substitute Team Entry</label><input type="text" class="form-control" id="substituteTeamUpdate" placeholder="Enter a Team Number"></div>';
    BootstrapDialog.show({
        type: 'type-success',
        title: '<b>Alliance Team ' + originalTeam + ' Substitution</b>',
        message: message,
        buttons: [{
            label: 'Make it so!',
            icon: 'glyphicon glyphicon-tower',
            hotkey: 13, // Enter.
            cssClass: "btn btn-success",
            action: function (dialogRef) {
                dialogRef.close();
                if ($("#substituteTeamUpdate").val()) {
                    replacementTeam = $("#substituteTeamUpdate").val();
                    if (allianceListUnsorted.indexOf(parseInt(replacementTeam)) >= 0) {
                        replacementAlliance[station] = replacementTeam;
                    } else {
                        BootstrapDialog.show({
                            type: 'type-warning',
                            title: '<b>Alliance Team ' + originalTeam + ' Substitution</b>',
                            message: "<b>" + replacementTeam + "<b> not found in the event.",
                            buttons: [{
                                label: 'Rats!',
                                icon: 'glyphicon glyphicon-tower',
                                hotkey: 13, // Enter.
                                cssClass: "btn btn-warning",
                                action: function (dialogRef) {
                                    dialogRef.close();
                                }
                            }]
                        });
                    }

                }
                announceDisplay();
            }
        }]
    });
}

function getTeamRanks() {
    "use strict";
    $("#rankUpdateContainer").html("Loading ranking data...");
    $('#ranksProgressBar').show();
    $('#teamRanksPicker').addClass('alert-danger');
    var req = new XMLHttpRequest();
    req.open('GET', apiURL + localStorage.currentYear + '/Rankings/' + localStorage.currentEvent);
    req.addEventListener('load', function () {
        var data = JSON.parse(req.responseText);
        if (data.Rankings.length === 0) {
            $("#rankingDisplay").html('<b>No Rankings available.</b>');
            $("#allianceSelectionPlaceholder").show();
            $("#allianceSelectionTable").hide();
            allianceListUnsorted = [];
            var teamList = JSON.parse(localStorage.teamList);
            for (var j = 0; j < teamList.length; j++) {
                allianceListUnsorted[j] = teamList[j].teamNumber;
            }
        } else {
            localStorage.Rankings = JSON.stringify(data.Rankings);
            if (localStorage.currentMatch > JSON.parse(localStorage.qualsList).Schedule.length) {
                $("#rankingDisplay").html("<b>Qual Seed<b>");
            } else {
                $("#rankingDisplay").html('<b>Ranking</b>');
            }
            $('#ranksContainer').html('<p class = "eventName">' + localStorage.eventName + '</p><p>This table lists the teams in rank order for this competition. This table updates during the competition, and freezes once Playoff Matches begin.</p><table id="ranksTable" class="table table-condensed table-responsive table-bordered table-striped"></table>');
            var ranksList = '<thead  id="ranksTableHead" class="thead-default"><tr><td class="col1"><b>Team #</b></td><td class="col1"><b>Rank</b></td><td class="col2"><b>Team Name</b></td><td class = "col1"><b>RP Avg.</b></td><td class="col1"><b>Wins</b></td><td  class="col1"><b>Losses</b></td><td class="col1"><b>Ties</b></td><td class="col1"><b>Qual Avg</b></td><td class="col1"><b>DQ</b></td><td class="col1"><b>Matches Played</b></td></tr></thead><tbody>';

            for (var i = 0; i < data.Rankings.length; i++) {
//                var missingTeam = (localStorage['teamData' + data.Rankings[i].teamNumber] || false);
//                if (missingTeam) {
                                                                
                var team = JSON.parse(localStorage['teamData' + data.Rankings[i].teamNumber]);

                team.rank = data.Rankings[i].rank;
                allianceTeamList[i] = data.Rankings[i].teamNumber;
                allianceListUnsorted[i] = data.Rankings[i].teamNumber;
                rankingsList = data.Rankings[i].teamNumber;
                team.sortOrder1 = data.Rankings[i].sortOrder1;
                team.sortOrder2 = data.Rankings[i].sortOrder2;
                team.sortOrder3 = data.Rankings[i].sortOrder3;
                team.sortOrder4 = data.Rankings[i].sortOrder4;
                team.sortOrder5 = data.Rankings[i].sortOrder5;
                team.sortOrder6 = data.Rankings[i].sortOrder6;
                team.wins = data.Rankings[i].wins;
                team.losses = data.Rankings[i].losses;
                team.ties = data.Rankings[i].ties;
                team.qualAverage = data.Rankings[i].qualAverage;
                team.dq = data.Rankings[i].dq;
                team.matchesPlayed = data.Rankings[i].matchesPlayed;
                $("#teamTableRank" + data.Rankings[i].teamNumber).html(data.Rankings[i].rank);
                $("#teamTableRank" + data.Rankings[i].teamNumber).attr("class", teamTableRankHighlight(data.Rankings[i].rank));
                ranksList += updateRanksTableRow(team, data.Rankings[i].teamNumber);
                localStorage['teamData' + data.Rankings[i].teamNumber] = JSON.stringify(team);
//                } else {
//                console.log("missing team: "+data.Rankings[i].teamNumber);
//                getTeamData(data.Rankings[i],localStorage.currentYear);}
            }
            $("#ranksProgressBar").hide();
            $('#ranksTable').html(ranksList + "</tbody>");
            $('#teamRanksPicker').removeClass('alert-danger');
            $('#teamRanksPicker').addClass('alert-success');

            $("#allianceUndoButton").hide();
            allianceChoices.Alliance1Captain = allianceTeamList[0];
            $("#Alliance1Captain").html("Alliance 1 Captain<div class ='allianceTeam allianceCaptain' captain='Alliance1Captain' teamnumber = '" + allianceTeamList[0] + "' id='allianceTeam" + allianceTeamList[0] + "' onclick='chosenAllianceAlert(this)'>" + allianceTeamList.shift() + "</div>");
            allianceChoices.Alliance2Captain = allianceTeamList[0];
            $("#Alliance2Captain").html("Alliance 2 Captain<div class ='allianceTeam allianceCaptain' captain='Alliance2Captain' teamnumber = '" + allianceTeamList[0] + "' id='allianceTeam" + allianceTeamList[0] + "' onclick='allianceAlert(this)'>" + allianceTeamList.shift() + "</div>");
            allianceChoices.Alliance3Captain = allianceTeamList[0];
            $("#Alliance3Captain").html("Alliance 3 Captain<div class ='allianceTeam allianceCaptain' captain='Alliance3Captain' teamnumber = '" + allianceTeamList[0] + "' id='allianceTeam" + allianceTeamList[0] + "' onclick='allianceAlert(this)'>" + allianceTeamList.shift() + "</div>");
            allianceChoices.Alliance4Captain = allianceTeamList[0];
            $("#Alliance4Captain").html("Alliance 4 Captain<div class ='allianceTeam allianceCaptain' captain='Alliance4Captain' teamnumber = '" + allianceTeamList[0] + "' id='allianceTeam" + allianceTeamList[0] + "' onclick='allianceAlert(this)'>" + allianceTeamList.shift() + "</div>");
            allianceChoices.Alliance5Captain = allianceTeamList[0];
            $("#Alliance5Captain").html("Alliance 5 Captain<div class ='allianceTeam allianceCaptain' captain='Alliance5Captain' teamnumber = '" + allianceTeamList[0] + "' id='allianceTeam" + allianceTeamList[0] + "' onclick='allianceAlert(this)'>" + allianceTeamList.shift() + "</div>");
            allianceChoices.Alliance6Captain = allianceTeamList[0];
            $("#Alliance6Captain").html("Alliance 6 Captain<div class ='allianceTeam allianceCaptain' captain='Alliance6Captain' teamnumber = '" + allianceTeamList[0] + "' id='allianceTeam" + allianceTeamList[0] + "' onclick='allianceAlert(this)'>" + allianceTeamList.shift() + "</div>");
            allianceChoices.Alliance7Captain = allianceTeamList[0];
            $("#Alliance7Captain").html("Alliance 7 Captain<div class ='allianceTeam allianceCaptain' captain='Alliance7Captain' teamnumber = '" + allianceTeamList[0] + "' id='allianceTeam" + allianceTeamList[0] + "' onclick='allianceAlert(this)'>" + allianceTeamList.shift() + "</div>");
            allianceChoices.Alliance8Captain = allianceTeamList[0];
            $("#Alliance8Captain").html("Alliance 8 Captain<div class ='allianceTeam allianceCaptain' captain='Alliance8Captain' teamnumber = '" + allianceTeamList[0] + "' id='allianceTeam" + allianceTeamList[0] + "' onclick='allianceAlert(this)'>" + allianceTeamList.shift() + "</div>");

            $("#backupAllianceTeam1").html("<div id='backupAllianceTeamContainer1' class ='allianceTeam' captain='alliance' teamnumber=" + allianceTeamList[0] + " onclick='allianceAlert(this)'>" + allianceTeamList[0] + "</div>");
            $("#backupAllianceTeam2").html("<div id='backupAllianceTeamContainer2' class ='allianceTeam' captain='alliance' teamnumber=" + allianceTeamList[1] + " onclick='allianceAlert(this)'>" + allianceTeamList[1] + "</div>");
            $("#backupAllianceTeam3").html("<div id='backupAllianceTeamContainer3' class ='allianceTeam' captain='alliance' teamnumber=" + allianceTeamList[2] + " onclick='allianceAlert(this)'>" + allianceTeamList[2] + "</div>");
            $("#backupAllianceTeam4").html("<div id='backupAllianceTeamContainer4' class ='allianceTeam' captain='alliance' teamnumber=" + allianceTeamList[3] + " onclick='allianceAlert(this)'>" + allianceTeamList[3] + "</div>");
            $("#backupAllianceTeam5").html("<div id='backupAllianceTeamContainer5' class ='allianceTeam' captain='alliance' teamnumber=" + allianceTeamList[4] + " onclick='allianceAlert(this)'>" + allianceTeamList[4] + "</div>");
            $("#backupAllianceTeam6").html("<div id='backupAllianceTeamContainer6' class ='allianceTeam' captain='alliance' teamnumber=" + allianceTeamList[5] + " onclick='allianceAlert(this)'>" + allianceTeamList[5] + "</div>");
            $("#backupAllianceTeam7").html("<div id='backupAllianceTeamContainer7' class ='allianceTeam' captain='alliance' teamnumber=" + allianceTeamList[6] + " onclick='allianceAlert(this)'>" + allianceTeamList[6] + "</div>");
            $("#backupAllianceTeam8").html("<div id='backupAllianceTeamContainer8' class ='allianceTeam' captain='alliance' teamnumber=" + allianceTeamList[7] + " onclick='allianceAlert(this)'>" + allianceTeamList[7] + "</div>");

            allianceTeamList = sortAllianceTeams(allianceTeamList);
            displayAwardsTeams(allianceListUnsorted.slice(0));

            $("#rankUpdateContainer").html(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
        }
    });
    if (localStorage.offseason !== "true") {
        req.send();
    }
}

function displayAwardsTeams(teamList) {
    "use strict";
    var column = 1;
    //var sortedTeams = teamList;
    var sortedTeams = [];
    teamList = JSON.parse(localStorage.teamList);
    for (var j = 0; j < teamList.length; j++) {
        sortedTeams[j] = teamList[j].teamNumber;
    }
    $("#awardsTeamList1").html("");
    $("#awardsTeamList2").html("");
    $("#awardsTeamList3").html("");
    $("#awardsTeamList4").html("");
    $("#awardsTeamList5").html("");
    $("#awardsTeamList6").html("");

    sortedTeams.sort(function (a, b) {
        return a - b;
    });

    for (var i = 0; i < sortedTeams.length; i++) {
        if (i < sortedTeams.length / 6) {
            column = "1";
        } else if (i > sortedTeams.length / 6 && i <= sortedTeams.length * 2 / 6) {
            column = "2";
        } else if (i > sortedTeams.length * 2 / 6 && i <= sortedTeams.length * 3 / 6) {
            column = "3";
        } else if (i > sortedTeams.length * 3 / 6 && i <= sortedTeams.length * 4 / 6) {
            column = "4";
        } else if (i > sortedTeams.length * 4 / 6 && i <= sortedTeams.length * 5 / 6) {
            column = "5";
        } else {
            column = "6";
        }
        $("#awardsTeamList" + column).append("<div class ='awardAllianceTeam' onclick='awardsAlert(this)' teamnumber='" + sortedTeams[i] + "' id='awardsAllianceTeam" + sortedTeams[i] + "'>" + sortedTeams[i] + "</div></br>");
    }
}


function displayAllianceCaptains(startingPosition) {
    "use strict";
    for (var i = 1; i <= 8; i++) {
        if (i <= startingPosition + 1) {
            $("#Alliance" + i + "Captain").html("Alliance " + i + " Captain<div class ='allianceTeam allianceCaptain' captain='Alliance" + i + "Captain' teamnumber='" + allianceChoices["Alliance" + i + "Captain"] + "' id='allianceTeam" + allianceChoices["Alliance" + i + "Captain"] + "' onclick='chosenAllianceAlert(this)'>" + allianceChoices["Alliance" + i + "Captain"] + "</div>");
        } else {
            $("#Alliance" + i + "Captain").html("Alliance " + i + " Captain<div class ='allianceTeam allianceCaptain' captain='Alliance" + i + "Captain' teamnumber='" + allianceChoices["Alliance" + i + "Captain"] + "' id='allianceTeam" + allianceChoices["Alliance" + i + "Captain"] + "' onclick='allianceAlert(this)'>" + allianceChoices["Alliance" + i + "Captain"] + "</div>");
        }
    }
    $("#backupAllianceTeam1").html("<div id='backupAllianceTeamContainer1' class ='allianceTeam' captain='alliance' teamnumber=" + allianceListUnsorted[8] + " onclick='allianceAlert(this)'>" + allianceListUnsorted[8] + "</div>");
    $("#backupAllianceTeam2").html("<div id='backupAllianceTeamContainer2' class ='allianceTeam' captain='alliance' teamnumber=" + allianceListUnsorted[9] + " onclick='allianceAlert(this)'>" + allianceListUnsorted[9] + "</div>");
    $("#backupAllianceTeam3").html("<div id='backupAllianceTeamContainer3' class ='allianceTeam' captain='alliance' teamnumber=" + allianceListUnsorted[10] + " onclick='allianceAlert(this)'>" + allianceListUnsorted[10] + "</div>");
    $("#backupAllianceTeam4").html("<div id='backupAllianceTeamContainer4' class ='allianceTeam' captain='alliance' teamnumber=" + allianceListUnsorted[11] + " onclick='allianceAlert(this)'>" + allianceListUnsorted[11] + "</div>");
    $("#backupAllianceTeam5").html("<div id='backupAllianceTeamContainer5' class ='allianceTeam' captain='alliance' teamnumber=" + allianceListUnsorted[12] + " onclick='allianceAlert(this)'>" + allianceListUnsorted[12] + "</div>");
    $("#backupAllianceTeam6").html("<div id='backupAllianceTeamContainer6' class ='allianceTeam' captain='alliance' teamnumber=" + allianceListUnsorted[13] + " onclick='allianceAlert(this)'>" + allianceListUnsorted[13] + "</div>");
    $("#backupAllianceTeam7").html("<div id='backupAllianceTeamContainer7' class ='allianceTeam' captain='alliance' teamnumber=" + allianceListUnsorted[14] + " onclick='allianceAlert(this)'>" + allianceListUnsorted[14] + "</div>");
    $("#backupAllianceTeam8").html("<div id='backupAllianceTeamContainer8' class ='allianceTeam' captain='alliance' teamnumber=" + allianceListUnsorted[15] + " onclick='allianceAlert(this)'>" + allianceListUnsorted[15] + "</div>");
}

function sortAllianceTeams(teamList) {
    "use strict";
    var column = 1;
    $("#allianceTeamList1").html("");
    $("#allianceTeamList2").html("");
    $("#allianceTeamList3").html("");
    $("#allianceTeamList4").html("");
    $("#allianceTeamList5").html("");

    teamList.sort(function (a, b) {
        return a - b;
    });

    for (var i = 0; i < teamList.length; i++) {
        if (i < teamList.length / 5) {
            column = "1";
        } else if (i > teamList.length / 5 && i <= teamList.length * 2 / 5) {
            column = "2";
        } else if (i > teamList.length * 2 / 5 && i <= teamList.length * 3 / 5) {
            column = "3";
        } else if (i > teamList.length * 3 / 5 && i <= teamList.length * 4 / 5) {
            column = "4";
        } else {
            column = "5";
        }
        $("#allianceTeamList" + column).append("<div class ='allianceTeam' onclick='allianceAlert(this)' captain='alliance' teamnumber='" + teamList[i] + "' id='allianceTeam" + teamList[i] + "'>" + teamList[i] + "</div></br>");
    }
    return teamList;
}

function allianceAlert(teamContainer) {
    "use strict";
    var teamNumber = teamContainer.getAttribute("teamnumber");
    var currentTeamInfo = JSON.parse(localStorage["teamData" + teamNumber]);
    var selectedTeamInfo = "<span class = 'allianceAnnounceDialog'>Team " + teamNumber + " ";

    if (currentTeamInfo.nameShortLocal === "") {
        selectedTeamInfo += currentTeamInfo.nameShort;
    } else {
        selectedTeamInfo += currentTeamInfo.nameShortLocal;
    }
    selectedTeamInfo += "<br> is from ";
    if (currentTeamInfo.organizationLocal === "") {
        selectedTeamInfo += currentTeamInfo.organization;
    } else {
        selectedTeamInfo += currentTeamInfo.organizationLocal;
    }
    selectedTeamInfo += "<br>in ";
    if (currentTeamInfo.cityStateLocal === "") {
        selectedTeamInfo += currentTeamInfo.cityState;
    } else {
        selectedTeamInfo += currentTeamInfo.cityStateLocal;
    }
    selectedTeamInfo += "</span>";

    BootstrapDialog.show({
        type: 'type-success',
        title: '<b>Alliance Choice</b>',
        message: selectedTeamInfo,
        buttons: [{
            icon: 'glyphicon glyphicon-tower',
            cssClass: "btn btn-primary",
            label: 'Alliance Captain Announce',
            hotkey: 65, // "A".
            action: function (dialogRef) {
                dialogRef.close();
            }
        }, {
            icon: 'glyphicon glyphicon-thumbs-down',
            cssClass: "btn btn-danger",
            label: 'Respectfully Decline',
            hotkey: 68, // "D".
            action: function (dialogRef) {
                dialogRef.close();
            }
        }, {
            icon: 'glyphicon glyphicon-thumbs-up',
            cssClass: "btn btn-success",
            hotkey: 13, // Enter.
            label: 'Gratefully Accept',
            action: function (dialogRef) {
                dialogRef.close();
                BootstrapDialog.show({
                    type: 'type-success',
                    title: '<b>Are you sure they want to accept?</b>',
                    message: "<span class = 'allianceAnnounceDialog'>Are you certain that Team " + teamNumber + " accepts the offer?</span>",
                    buttons: [{
                        icon: 'glyphicon glyphicon-thumbs-down',
                        label: 'No, they did not accept.',
                        hotkey: 78, // "N".
                        cssClass: "btn btn-danger",
                        action: function (dialogRef) {
                            dialogRef.close();
                        }
                    }, {
                        icon: 'glyphicon glyphicon-thumbs-up',
                        cssClass: "btn btn-success",
                        label: 'Gratefully Accept',
                        hotkey: 13, // Enter.
                        action: function (dialogRef) {
                            dialogRef.close();
                            //setup the undo
                            allianceChoicesUndo.push(JSON.stringify(allianceChoices));
                            allianceListUnsortedUndo.push(JSON.stringify(allianceListUnsorted));
                            allianceTeamListUndo.push(JSON.stringify(allianceTeamList));
                            allianceSelectionTableUndo.push($("#allianceSelectionTable").html());
                            //teamNumberUndo.push(teamNumber);
                            $("#allianceUndoButton").attr("onclick", "undoAllianceSelection()");
                            $("#allianceUndoButton").show();
                            //$("#undoAlliance").html("<b>"+teamNumber+"</b>");
                            //execute the selection
                            allianceChoices[allianceSelectionOrder[currentAllianceChoice]] = teamNumber;
                            var index = allianceListUnsorted.indexOf(parseInt(teamNumber));
                            if (index > -1) {
                                allianceListUnsorted.splice(index, 1);
                            }

                            index = allianceTeamList.indexOf(parseInt(teamNumber));
                            if (index > -1) {
                                allianceTeamList.splice(index, 1);
                            }

                            if (teamContainer.getAttribute("captain") !== "alliance") {

                                var allianceBackfill = teamContainer.getAttribute("captain");
                                teamContainer.setAttribute("captain", "alliance");
                                var nextAlliance = parseInt(allianceBackfill.substr(8, 1));
                                for (var j = nextAlliance; j < 8; j++) {
                                    allianceChoices["Alliance" + j + "Captain"] = allianceChoices["Alliance" + (j + 1) + "Captain"];
                                }
                                allianceChoices.Alliance8Captain = allianceListUnsorted[7];
                                index = allianceTeamList.indexOf(parseInt(allianceChoices.Alliance8Captain));
                                if (index > -1) {
                                    allianceTeamList.splice(index, 1);
                                }

                            }

                            teamContainer.removeAttribute("onclick");
                            teamContainer.setAttribute("onclick", "chosenAllianceAlert(this)");
                            teamContainer.id = "allianceTeam" + teamContainer.getAttribute("teamNumber");
                            $("#" + teamContainer.getAttribute("id")).removeClass("allianceCaptain");
                            $("#" + allianceSelectionOrder[currentAllianceChoice]).append(teamContainer);
                            $("#" + allianceSelectionOrder[currentAllianceChoice].substr(0, 9)).removeClass("dropzone");
                            $("#" + allianceSelectionOrder[currentAllianceChoice]).removeClass("nextAllianceChoice");


                            currentAllianceChoice++;

                            if (currentAllianceChoice <= allianceSelectionLength) {
                                $("#" + allianceSelectionOrder[currentAllianceChoice].slice(0, 9)).addClass("dropzone");
                                $("#" + allianceSelectionOrder[currentAllianceChoice]).addClass("nextAllianceChoice");
                            }

                            teamContainer.textContent = teamNumber;

                            displayAllianceCaptains(currentAllianceChoice);
                            sortAllianceTeams(allianceTeamList);
                            if (currentAllianceChoice === parseInt((allianceSelectionLength + 1))) {
                                localStorage.allianceNoChange = "true";
                                for (var k = 0; k < eventTeamList.length; k++) {
                                    //document.getElementById("allianceTeam" + eventTeamList[k].teamNumber).onclick = "";
                                    document.getElementById("allianceTeam" + eventTeamList[k].teamNumber).setAttribute("onclick", "chosenAllianceAlert(this)");
                                }
                                for (k = 1; k <= 8; k++) {
                                    //document.getElementById("backupAllianceTeamContainer" + k).onclick = "";
                                    document.getElementById("backupAllianceTeamContainer" + k).setAttribute("onclick", "chosenAllianceAlert(this)");
                                }
                                //$(".awardAllianceTeam").removeAttr("onclick");
                                //$(".awardAllianceTeam").attr("onclick","chosenAllianceAlert(this)");
                            }
                        }
                    }]
                });
            }
        }]
    });

}

function undoAllianceSelection() {
    "use strict";
    //setup the undo
    allianceChoices = JSON.parse(allianceChoicesUndo.pop());
    allianceListUnsorted = JSON.parse(allianceListUnsortedUndo.pop());
    allianceTeamList = JSON.parse(allianceTeamListUndo.pop());
    $("#allianceSelectionTable").html(allianceSelectionTableUndo.pop());
    //$("#undoAlliance").html("<b>"+teamNumberUndo.pop()+"</b>");
    $("#allianceUndoButton").attr("onclick", "undoAllianceSelection()");

    //redraw the page
    currentAllianceChoice = currentAllianceChoice - 1;
    if (currentAllianceChoice === 0) {
        $("#allianceUndoButton").attr("onclick", "");
        $("#allianceUndoButton").hide();
    }
}

function awardsAlert(teamContainer) {
    "use strict";
    var teamNumber = teamContainer.getAttribute("teamnumber");
    var captain = teamContainer.getAttribute("captain");
    var currentTeamInfo = JSON.parse(localStorage["teamData" + teamNumber]);
    var selectedTeamInfo = "<span class = 'allianceAnnounceDialog'>Team " + teamNumber + " ";
    var rookieTag = rookieYearDisplay(currentTeamInfo.rookieYear).trim();
    rookieTag = rookieTag.substring(6, rookieTag.length - 1);

    if (currentTeamInfo.nameShortLocal === "") {
        selectedTeamInfo += currentTeamInfo.nameShort;
    } else {
        selectedTeamInfo += currentTeamInfo.nameShortLocal;
    }
    selectedTeamInfo += "<br> is from ";
    if (currentTeamInfo.organizationLocal === "") {
        selectedTeamInfo += currentTeamInfo.organization;
    } else {
        selectedTeamInfo += currentTeamInfo.organizationLocal;
    }
    selectedTeamInfo += "<br>in ";
    if (currentTeamInfo.cityStateLocal === "") {
        selectedTeamInfo += currentTeamInfo.cityState + "<br>";
    } else {
        selectedTeamInfo += currentTeamInfo.cityStateLocal + "<br>";
    }
    selectedTeamInfo += "<br>Founded in " + currentTeamInfo.rookieYear + ", this is their " + rookieTag + " competing with FIRST.</span>";

    BootstrapDialog.show({
        type: 'type-success',
        title: '<b>Awards Announcement</b>',
        message: selectedTeamInfo,
        buttons: [{
            label: 'Congratulations!',
            icon: 'glyphicon glyphicon-tower',
            hotkey: 13, // Enter.
            cssClass: "btn btn-success",
            action: function (dialogRef) {
                dialogRef.close();
            }
        }]
    });
}

function chosenAllianceAlert(teamContainer) {
    "use strict";
    var teamNumber = teamContainer.getAttribute("teamnumber");
    var captain = teamContainer.getAttribute("captain");
    var currentTeamInfo = JSON.parse(localStorage["teamData" + teamNumber]);
    var selectedTeamInfo = "<span class = 'allianceAnnounceDialog'>Team " + teamNumber + " ";
    var rookieTag = rookieYearDisplay(currentTeamInfo.rookieYear).trim();
    rookieTag = rookieTag.substring(6, rookieTag.length - 1);

    if (currentTeamInfo.nameShortLocal === "") {
        selectedTeamInfo += currentTeamInfo.nameShort;
    } else {
        selectedTeamInfo += currentTeamInfo.nameShortLocal;
    }
    selectedTeamInfo += "<br> is from ";
    if (currentTeamInfo.organizationLocal === "") {
        selectedTeamInfo += currentTeamInfo.organization;
    } else {
        selectedTeamInfo += currentTeamInfo.organizationLocal;
    }
    selectedTeamInfo += "<br>in ";
    if (currentTeamInfo.cityStateLocal === "") {
        selectedTeamInfo += currentTeamInfo.cityState + "<br>";
    } else {
        selectedTeamInfo += currentTeamInfo.cityStateLocal + "<br>";
    }
    selectedTeamInfo += "<br>Founded in " + currentTeamInfo.rookieYear + ", this is their " + rookieTag + " competing with FIRST.</span>";

    BootstrapDialog.show({
        type: 'type-success',
        icon: 'glyphicon glyphicon-tower',
        title: '<b>Alliance Team Information</b>',
        message: selectedTeamInfo,
        buttons: [{
            label: 'Congratulations!',
            hotkey: 13, // Enter.
            cssClass: "btn btn-success",
            action: function (dialogRef) {
                dialogRef.close();
            }
        }]
    });
}

function getTeamAwards(teamNumber, year) {
    "use strict";
    teamAwardCalls++;
    $('#teamDataTabPicker').addClass('alert-danger');
    var awards = "";
    var year1 = year - 1;
    var year2 = year - 2;
    var eventNames = JSON.parse(localStorage.events);

    var teamData = JSON.parse(localStorage["teamData" + teamNumber]);

    var awardHilight = {
        "before": "<b>",
        "after": "</b>"
    };
    var awardName = "";

    var req = new XMLHttpRequest();
    req.open('GET', apiURL + year + '/awards/' + teamNumber + "/");
    req.addEventListener('load', function () {
        teamLoadProgressBar++;
        $('#teamloadprogressbar').attr("style", "width:" + (teamLoadProgressBar / teamCountTotal * 100) + "%");
        $('#teamProgressBarLoading').attr("style", "width:" + (teamLoadProgressBar / teamCountTotal * 100) + "%");

        if (req.responseText.substr(0, 5) !== '"Team') {
            var data = JSON.parse(req.responseText);
            //console.log(teamData.rookieYear+" "+year+"/awards/"+teamNumber+": "+req.responseText);
            if ((data.Awards !== '{"Awards":[]}') && (req.responseText.substr(0,5)!=='"Malf')) {
                for (var i = 0; i < data.Awards.length; i++) {
                    awardName = data.Awards[i].name;
                    awardHilight = awardsHilight(awardName);

                    if (localStorage.showEventNames === "true") {
                        if (eventNames[data.Awards[i].eventCode]) {
                            awards += awardHilight.before + year + " " + eventNames[data.Awards[i].eventCode] + ": " + awardName + awardHilight.after + localStorage.awardSeparator;
                        } else {
                            awards += awardHilight.before + year + " " + data.Awards[i].eventCode + ": " + awardName + awardHilight.after + localStorage.awardSeparator;
                        }
                    } else {
                        awards += awardHilight.before + year + " " + data.Awards[i].eventCode + ": " + awardName + awardHilight.after + localStorage.awardSeparator;
                    }

                }
            }
        }
        if ((localStorage.awardDepth > 1) && (teamData.rookieYear <= year1) ) {
            req1.send();
        } else {
            if (awards.length > 4) {
                awards = awards.substr(0, awards.length - 4);
            }
            teamData.awards = awards;
            localStorage["teamData" + teamNumber] = JSON.stringify(teamData);
            teamAwardCalls--;
            if ((teamAwardCalls === 0) && (teamUpdateCalls === 0) && (lastSchedulePage)) {
                $('#teamDataTabPicker').removeClass('alert-danger');
                $('#teamDataTabPicker').addClass('alert-success');
                $('#teamloadprogress').hide();
                $('#teamProgressBar').hide();
                teamLoadProgressBar = 0;
                $('#teamloadprogressbar').attr("style", "width:" + (teamLoadProgressBar / teamCountTotal * 100) + "%");
                $('#teamProgressBarLoading').attr("style", "width:" + (teamLoadProgressBar / teamCountTotal * 100) + "%");

            }
        }
    });

    var req1 = new XMLHttpRequest();
    req1.open('GET', apiURL + year1 + '/awards/' + teamNumber + "/");
    req1.addEventListener('load', function () {
        teamLoadProgressBar++;
        $('#teamloadprogressbar').attr("style", "width:" + (teamLoadProgressBar / teamCountTotal * 100) + "%");
        $('#teamProgressBarLoading').attr("style", "width:" + (teamLoadProgressBar / teamCountTotal * 100) + "%");

        if (req1.responseText.substr(0, 5) !== '"Team') {
            if (year1 === 2016) {
                eventNames = JSON.parse(localStorage.events2016);
            } else if (year1 === 2017) {
                eventNames = JSON.parse(localStorage.events2017);
            }
            var data = JSON.parse(req1.responseText);
            //console.log(teamData.rookieYear+" "+year1+"/awards/"+teamNumber+": "+req1.responseText);
            if ((data.Awards !== '{"Awards":[]}') && (req1.responseText.substr(0,5)!=='"Malf')) {
                for (var i = 0; i < data.Awards.length; i++) {
                    awardName = data.Awards[i].name;
                    awardHilight = awardsHilight(awardName);

                    if (localStorage.showEventNames === "true") {
                        if (eventNames[data.Awards[i].eventCode]) {
                            awards += awardHilight.before + year1 + " " + eventNames[data.Awards[i].eventCode] + ": " + awardName + awardHilight.after + localStorage.awardSeparator;
                        } else {
                            awards += awardHilight.before + year1 + " " + data.Awards[i].eventCode + ": " + awardName + awardHilight.after + localStorage.awardSeparator;
                        }
                    } else {
                        awards += awardHilight.before + year1 + " " + data.Awards[i].eventCode + ": " + awardName + awardHilight.after + localStorage.awardSeparator;
                    }
                }
            }
        }
        if ((localStorage.awardDepth > 2) && (teamData.rookieYear <= year2) ) {
            req2.send();
        } else {
            if (awards.length > 4) {
                awards = awards.substr(0, awards.length - 4);
            }
            teamData.awards = awards;
            localStorage["teamData" + teamNumber] = JSON.stringify(teamData);
            teamAwardCalls--;
            if ((teamAwardCalls === 0) && (teamUpdateCalls === 0) && (lastSchedulePage)) {
                $('#teamDataTabPicker').removeClass('alert-danger');
                $('#teamDataTabPicker').addClass('alert-success');
                $('#teamloadprogress').hide();
                $('#teamProgressBar').hide();
                teamLoadProgressBar = 0;
                $('#teamloadprogressbar').attr("style", "width:" + (teamLoadProgressBar / teamCountTotal * 100) + "%");
                $('#teamProgressBarLoading').attr("style", "width:" + (teamLoadProgressBar / teamCountTotal * 100) + "%");

            }
        }
    });

    var req2 = new XMLHttpRequest();
    req2.open('GET', apiURL + year2 + '/awards/' + teamNumber + "/");
    req2.addEventListener('load', function () {
        teamLoadProgressBar++;
        $('#teamloadprogressbar').attr("style", "width:" + (teamLoadProgressBar / teamCountTotal * 100) + "%");
        $('#teamProgressBarLoading').attr("style", "width:" + (teamLoadProgressBar / teamCountTotal * 100) + "%");
        if (req2.responseText.substr(0, 5) !== '"Team') {
            if (year2 === 2016) {
                eventNames = JSON.parse(localStorage.events2016);
            } else if (year2 === 2017) {
                eventNames = JSON.parse(localStorage.events2017);
            }
            var data = JSON.parse(req2.responseText);
            //console.log(teamData.rookieYear+" "+year2+"/awards/"+teamNumber+": "+req2.responseText);
            if ((data.Awards !== '{"Awards":[]}') && (req2.responseText.substr(0,5)!=='"Malf')) {

                for (var i = 0; i < data.Awards.length; i++) {
                    awardName = data.Awards[i].name;
                    awardHilight = awardsHilight(awardName);

                    if (localStorage.showEventNames === "true") {
                        if (eventNames[data.Awards[i].eventCode]) {
                            awards += awardHilight.before + year2 + " " + eventNames[data.Awards[i].eventCode] + ": " + awardName + awardHilight.after + localStorage.awardSeparator;
                        } else {
                            awards += awardHilight.before + year2 + " " + data.Awards[i].eventCode + ": " + awardName + awardHilight.after + localStorage.awardSeparator;
                        }
                    } else {
                        awards += awardHilight.before + year2 + " " + data.Awards[i].eventCode + ": " + awardName + awardHilight.after + localStorage.awardSeparator;
                    }
                }
            }
        }
        if (awards.length > 4) {
            awards = awards.substr(0, awards.length - 4);
        }
        teamData.awards = awards;
        localStorage["teamData" + teamNumber] = JSON.stringify(teamData);
        teamAwardCalls--;
        if ((teamAwardCalls === 0) && (teamUpdateCalls === 0) && (lastSchedulePage)) {
            $('#teamDataTabPicker').removeClass('alert-danger');
            $('#teamDataTabPicker').addClass('alert-success');
            $('#teamloadprogress').hide();
            $('#teamProgressBar').hide();
            teamLoadProgressBar = 0;
            $('#teamloadprogressbar').attr("style", "width:" + (teamLoadProgressBar / teamCountTotal * 100) + "%");
            $('#teamProgressBarLoading').attr("style", "width:" + (teamLoadProgressBar / teamCountTotal * 100) + "%");

        }
    });

    if (teamData.rookieYear <= year) {
        req.send();
    }
}

function getTeamData(teamList, year) {
    "use strict";
    $('#teamDataTabPicker').addClass('alert-danger');
    var req = new XMLHttpRequest();
    var team = teamList.shift();
    req.open('GET', apiURL + year + '/teamdata/' + team.teamNumber + "/");
    req.addEventListener('load', function () {
        if (req.responseText.substr(0, 5) !== '"Team') {
            var data = JSON.parse(req.responseText);
            if (data.teams.length > 0) {
                var teamData = data.teams[0];
                $("#teamsTable").append(generateTeamTableRow(teamData));
                eventTeamList.push(data.teams[0]);
                //localStorage.teamList = JSON.stringify(eventTeamList);
            }
            if (teamList.length > 0) {
                getTeamData(teamList, year);
            } else {
                $('#teamDataTabPicker').removeClass('alert-danger');
                $('#teamDataTabPicker').addClass('alert-success');
            }
        }
    });
    req.send();
}

function generateMatchTableRow(matchData) {
    "use strict";
    var returnData = '<tr><td>';
    var matchWinner = "";
    if (matchData.actualStartTime) {
        returnData += "Actual:<br>" + moment(matchData.actualStartTime, 'YYYY-MM-DDTHH:mm:ss').format('ddd hh:mm A') + '</td><td>';
    } else {
        if (localStorage.offseason === "true") {
            returnData += "Scheduled:<br>" + matchData.startTime + '</td><td>';
        } else {
            returnData += "Scheduled:<br>" + moment(matchData.startTime, 'YYYY-MM-DDTHH:mm:ss').format('ddd hh:mm:ss A') + '</td><td>';
        }
        
    }
    returnData += matchData.description + '</td><td>';
    returnData += matchData.matchNumber + '</td><td>';
    if ((matchData.scoreRedFinal !== null) && (matchData.scoreRedFinal > matchData.scoreBlueFinal)) {
        matchWinner = "Red";
        returnData += '<span class="redScoreWin">R:' + matchData.scoreRedFinal + '</span><br><span class="blueScore"> B:' + matchData.scoreBlueFinal + '</span></td><td>';
    } else if ((matchData.scoreRedFinal !== null) && matchData.scoreRedFinal < matchData.scoreBlueFinal) {
        matchWinner = "Blue";
        returnData += '<span class="redScore">R:' + matchData.scoreRedFinal + '</span><br><span class="blueScoreWin"> B:' + matchData.scoreBlueFinal + '</span></td><td>';
    } else if (matchData.scoreRedFinal !== null) {
        matchWinner = "Tie";
        returnData += '<span class="redScore">R:' + matchData.scoreRedFinal + '</span><br><span class="blueScore"> B:' + matchData.scoreBlueFinal + '</span></td><td>';
    } else {
        matchWinner = "No results yet";
        returnData += 'No data.</td><td>';
    }
    returnData += '<span class = "redAllianceTeam">' + getTeamForStation(matchData.teams, 'Red1').teamNumber + '</span><br><span class = "blueAllianceTeam">' + getTeamForStation(matchData.teams, 'Blue1').teamNumber + '</span></td><td>';
    returnData += '<span class = "redAllianceTeam">' + getTeamForStation(matchData.teams, 'Red2').teamNumber + '</span><br><span class = "blueAllianceTeam">' + getTeamForStation(matchData.teams, 'Blue2').teamNumber + '</span></td><td>';
    returnData += '<span class = "redAllianceTeam">' + getTeamForStation(matchData.teams, 'Red3').teamNumber + '</span><br><span class = "blueAllianceTeam">' + getTeamForStation(matchData.teams, 'Blue3').teamNumber + '</span></td>';

//    returnData += getTeamForStation(matchData.teams, 'Red1').teamNumber + '</td><td>';
//    returnData += getTeamForStation(matchData.teams, 'Red2').teamNumber + '</td><td>';
//    returnData += getTeamForStation(matchData.teams, 'Red3').teamNumber + '</td><td>';
//    returnData += getTeamForStation(matchData.teams, 'Blue1').teamNumber + '</td><td>';
//    returnData += getTeamForStation(matchData.teams, 'Blue2').teamNumber + '</td><td>';
//    returnData += getTeamForStation(matchData.teams, 'Blue3').teamNumber + '</td>';
    
    if (matchData.scoreBlueFinal > localStorage.matchHighScore) {
        localStorage.matchHighScore = matchData.scoreBlueFinal;
        localStorage.highScoreDetails = matchData.description;
    }
    if (matchData.scoreRedFinal > localStorage.matchHighScore) {
        localStorage.matchHighScore = matchData.scoreRedFinal;
        localStorage.highScoreDetails = matchData.description;
    }
    playoffResults[matchData.description] = matchWinner;
    return returnData + '</tr>';
}

function getTeamForStation(teamList, station) {
    "use strict";
    for (var j = 0; j < teamList.length; j++) {
        if (teamList[j].station === station) {
            return teamList[j];
        }
    }
    var r = {};
    r.teamNumber = "";
    return r;
}

function updateRanksTableRow(teamData, teamNumber) {
    "use strict";
    var returnData = '<tr><td id="rankTableNumber' + teamNumber + '">' + teamNumber + '</td>';
    returnData += '<td id="rankTableRank' + teamData.teamNumber + '">' + teamData.rank + '</td>';
    if (teamData.nameShortLocal === "") {
        returnData += '<td id="rankTableName' + teamData.teamNumber + '">' + teamData.nameShort + '</td>';
    } else {
        returnData += '<td id="rankTableName' + teamData.teamNumber + '">' + teamData.nameShortLocal + '</td>';
    }

    returnData += '<td id="rankTableRP' + teamData.teamNumber + '">' + teamData.sortOrder1 + '</td>';

    returnData += '<td id="rankTableWins' + teamData.teamNumber + '">' + teamData.wins + '</td>';

    returnData += '<td id="rankTableLosses' + teamData.teamNumber + '">' + teamData.losses + '</td>';

    returnData += '<td id="rankTableTies' + teamData.teamNumber + '">' + teamData.ties + '</td>';

    returnData += '<td id="rankTableQualAverage' + teamData.teamNumber + '">' + teamData.qualAverage + '</td>';

    returnData += '<td id="rankTableDq' + teamData.teamNumber + '">' + teamData.dq + '</td>';

    returnData += '<td id="rankTableMatchesPlayed' + teamData.teamNumber + '">' + teamData.matchesPlayed + '</td>';

    return returnData + '</tr>';
}


function updateTeamTableRow(teamData) {
    "use strict";
    var teamInfo = JSON.parse(localStorage['teamData' + teamData.teamNumber]);
    var lastVisit = "";
    if (teamInfo.lastVisit === "No recent visit") {
        lastVisit = "No recent visit";
    } else {
        lastVisit = moment(teamInfo.lastVisit).fromNow();
    }
    var returnData = '<tr><td class = "btn-default" id="teamTableNumber' + teamData.teamNumber + '" onclick="updateTeamInfo(' + teamData.teamNumber + ')"><span class="teamDataNumber">' + teamData.teamNumber + '</span><br><span id="lastVisit' + teamData.teamNumber + '" teamNumber = "' + teamData.teamNumber + '"  lastvisit = "' + teamInfo.lastVisit + '">' + lastVisit + '</span></td>';
    returnData += '<td id="teamTableRank' + teamData.teamNumber + '" class="rank0"></td>';
    if (teamInfo.nameShortLocal === "") {
        returnData += '<td id="teamTableName' + teamData.teamNumber + '">' + teamInfo.nameShort + '</td>';
    } else {
        returnData += '<td  class="bg-success" id="teamTableName' + teamData.teamNumber + '">' + teamInfo.nameShortLocal + '</td>';
    }
    if (teamInfo.cityStateLocal === "") {
        returnData += '<td id="teamTableCityState' + teamData.teamNumber + '">' + teamInfo.cityState + '</td>';
    } else {
        returnData += '<td  class="bg-success" id="teamTableCityState' + teamData.teamNumber + '">' + teamInfo.cityStateLocal + '</td>';
    }

    if (teamInfo.topSponsorsLocal === "") {
        returnData += '<td id="teamTableNameFull' + teamData.teamNumber + '">' + teamInfo.topSponsors + '</td>';
    } else {
        returnData += '<td  class="bg-success" id="teamTableNameFull' + teamData.teamNumber + '">' + teamInfo.topSponsorsLocal + '</td>';
    }

    if (teamInfo.organizationLocal === "") {
        returnData += '<td id="teamTableOrganization' + teamData.teamNumber + '">' + teamInfo.organization + '</td>';
    } else {
        returnData += '<td class="bg-success" id="teamTableNameOrganization' + teamData.teamNumber + '">' + teamInfo.organizationLocal + '</td>';
    }
    returnData += '<td id="teamTableRookieYear' + teamData.teamNumber + '">' + rookieYearDisplay(teamInfo.rookieYear) + '</td>';
    if ((teamInfo.robotName === null) && (teamInfo.robotNameLocal === "")) {
        returnData += '<td id="teamTableRobotName' + teamData.teamNumber + '">' + "No robot name reported" + '</td>';
    } else {
        if (teamInfo.robotNameLocal === "") {
            returnData += '<td id="teamTableRobotName' + teamData.teamNumber + '">' + teamInfo.robotName + '</td>';
        } else {
            returnData += '<td  class="bg-success" id="teamTableRobotName' + teamData.teamNumber + '">' + teamInfo.robotNameLocal + '</td>';
        }
    }

    return returnData + '</tr>';
}

function generateTeamTableRow(teamData) {
    "use strict";
    var teamInfo = {};
    if (typeof (localStorage['teamData' + teamData.teamNumber]) !== 'undefined') {
        teamInfo = JSON.parse(localStorage['teamData' + teamData.teamNumber]);
    } else {
        teamInfo = {
            "nameShort": teamData.nameShort,
            "cityState": teamData.city + ', ' + teamData.stateProv,
            "nameFull": teamData.nameFull,
            "rookieYear": teamData.rookieYear,
            "robotName": teamData.robotName,
            "organization": "",
            "sponsors": "",
            "topSponsors": "",
            "awards": "",
            "alliance": "",
            "allianceName": "",
            "allianceChoice": "",
            "rank": "",
            "sortOrder1": "",
            "sortOrder2": "",
            "sortOrder3": "",
            "sortOrder4": "",
            "sortOrder5": "",
            "sortOrder6": "",
            "wins": "",
            "losses": "",
            "ties": "",
            "qualAverage": "",
            "dq": "",
            "matchesPlayed": "",
            "nameShortLocal": "",
            "cityStateLocal": "",
            "topSponsorsLocal": "",
            "sponsorsLocal": "",
            "organizationLocal": "",
            "robotNameLocal": "",
            "awardsLocal": "",
            "teamMottoLocal": "",
            "teamNotesLocal": "",
            "lastVisit": "No recent visit"
        };
    }

    var returnData = "";
    var robotName = "";
    var organization = "";
    var sponsors = "";
    var topSponsors = "";
    var topSponsorsArray = [];
    var sponsorsRaw = teamData.nameFull;
    var sponsorArray = [];
    var organizationArray = [];

    if (teamData.schoolName) {
        organization = teamData.schoolName;
    }

    //determine if we have the organization already. If so, strip it out of the sponsors.
    if (!organization) {
        sponsorArray = trimArray(teamData.nameFull.split("/"));
    } else {
        if (organization === sponsorsRaw) {
            sponsorArray[0] = sponsorsRaw;
        } else {
            sponsorsRaw = sponsorsRaw.slice(0, sponsorsRaw.length - organization.length).trim();
            sponsorsRaw = sponsorsRaw.slice(0, sponsorsRaw.length - 1).trim();
            sponsorArray = trimArray(sponsorsRaw.split("/"));
        }
    }

    //Prepare for finding the organization from the NameFull field
    organizationArray = trimArray(teamData.nameFull.split("/").pop().split("&"));

    //If there's no sponsors or organization, add nice text.

    if (!sponsorArray && !organizationArray && !organization) {
        organization = "No organization in TIMS";
        sponsors = "No sponsors in TIMS";
        topSponsorsArray[0] = sponsors;
    }


    //Divide the sponsors into an array
    if (sponsorArray.length === 1) {
        sponsors = sponsorArray[0];
        topSponsors = sponsors;
    } else {
        if (organizationArray.length > 1 && !organization) {
            //To handle pre-2017 events, we need to remove the organization from the array
            sponsorArray.pop();
            sponsorArray.push(organizationArray.slice(0).shift());
        }
        //build the list of sponsors
        topSponsorsArray = sponsorArray.slice(0, 5);
        var lastSponsor = sponsorArray.pop();
        sponsors = sponsorArray.join(", ");
        sponsors += " & " + lastSponsor;
        lastSponsor = topSponsorsArray.pop();
        topSponsors = topSponsorsArray.join(", ");
        topSponsors += " & " + lastSponsor;
    }

    //Tease out the organization from the array if pre-2017
    if (organizationArray.length === 1 && !organization) {
        organization = organizationArray[0];
    } else {
        if (!organization) {
            organizationArray.shift();
            organization = organizationArray.join(" & ");
        }
    }
    var lastVisit = "";
    if (teamInfo.lastVisit === "No recent visit") {
        lastVisit = "No recent visit";
    } else {
        lastVisit = moment(teamInfo.lastVisit).fromNow();
    }
    //Return the Team Table
    returnData += '<tr><td class = "btn-default" id="teamTableNumber' + teamData.teamNumber + '" onclick="updateTeamInfo(' + teamData.teamNumber + ')"><span class="teamDataNumber">' + teamData.teamNumber + '</span><br><span id="lastVisit' + teamData.teamNumber + '" teamNumber = "' + teamData.teamNumber + '" lastvisit = "' + teamInfo.lastVisit + '">' + lastVisit + '</span></td>';
    //returnData += '<td id="teamTableRank' + teamData.teamNumber + '" class="'+teamTableRankHighlight(teamInfo.rank)+'">' + teamInfo.rank + '</td>';
    returnData += '<td id="teamTableRank' + teamData.teamNumber + '" class="rank0"></td>';
    if (teamInfo.nameShortLocal === "") {
        returnData += '<td id="teamTableName' + teamData.teamNumber + '">' + teamInfo.nameShort + '</td>';
    } else {
        returnData += '<td  class="bg-success" id="teamTableName' + teamData.teamNumber + '">' + teamInfo.nameShortLocal + '</td>';
    }
    if (teamInfo.cityStateLocal === "") {
        returnData += '<td id="teamTableCityState' + teamData.teamNumber + '">' + teamData.city + ", " + teamData.stateProv + '</td>';
    } else {
        returnData += '<td  class="bg-success" id="teamTableCityState' + teamData.teamNumber + '">' + teamInfo.cityStateLocal + '</td>';
    }
    if (teamInfo.topSponsorsLocal === "") {
        returnData += '<td id="teamTableNameFull' + teamData.teamNumber + '">' + topSponsors + '</td>';
    } else {
        returnData += '<td  class="bg-success" id="teamTableNameFull' + teamData.teamNumber + '">' + teamInfo.topSponsorsLocal + '</td>';
    }
    if (teamInfo.organizationLocal === "") {
        returnData += '<td id="teamTableOrganization' + teamData.teamNumber + '">' + organization + '</td>';
    } else {
        returnData += '<td  class="bg-success" id="teamTableNameOrganization' + teamData.teamNumber + '">' + teamInfo.organizationLocal + '</td>';
    } //replace with organization function.
    returnData += '<td id="teamTableRookieYear' + teamData.teamNumber + '">' + rookieYearDisplay(teamData.rookieYear) + '</td>';
    if ((teamData.robotName === null) && (teamInfo.robotNameLocal === "")) {
        returnData += '<td id="teamTableRobotName' + teamData.teamNumber + '">' + "No robot name reported" + '</td>';
    } else {
        if (teamInfo.robotNameLocal === "") {
            returnData += '<td id="teamTableRobotName' + teamData.teamNumber + '">' + teamData.robotName + '</td>';
        } else {
            returnData += '<td  class="bg-success" id="teamTableRobotName' + teamData.teamNumber + '">' + teamInfo.robotNameLocal + '</td>';
        }
        robotName = teamData.robotName;
    }
    teamInfo.sponsors = sponsors;
    teamInfo.topSponsors = topSponsors;
    teamInfo.organization = organization;
    localStorage['teamData' + teamData.teamNumber] = JSON.stringify(teamInfo);
    getTeamAwards(teamData.teamNumber, localStorage.currentYear);

    return returnData + '</tr>';
}

function trimArray(arr) {
    "use strict";
    for (var i = 0; i <= arr.length - 1; i++) {
        arr[i] = arr[i].trim();
    }
    return arr;
}

function teamTableRankHighlight(rank) {
    "use strict";
    if ((rank <= 8) && (rank > 1)) {
        return "rank2";
    } else if ((rank < 11) && (rank > 8)) {
        return "rank9";
    } else if (rank === 1) {
        return "rank1";

    } else {
        return "rank0";
    }

}

function rankHighlight(station, rank) {
    "use strict";
    if ((rank <= 8) && (rank > 1)) {
        document.getElementById(station).style.color = "white";
        document.getElementById(station).style.backgroundColor = "green";
    } else if ((rank < 11) && (rank > 8)) {
        document.getElementById(station).style.color = "black";
        document.getElementById(station).style.backgroundColor = "yellow";
    } else if (rank === 1) {
        document.getElementById(station).style.color = "white";
        document.getElementById(station).style.backgroundColor = "orange";

    } else {
        document.getElementById(station).style.color = "";
        document.getElementById(station).style.backgroundColor = "";
    }

}

function updateTeamInfo(teamNumber) {
    "use strict";
    localStorage.currentTeam = teamNumber;
    var teamData = JSON.parse(localStorage["teamData" + teamNumber]);
    $("#teamNumberUpdate").html(teamNumber);

    if (teamData.nameShort) {
        $("#teamNameUpdateTIMS").html(teamData.nameShort);
    } else {
        $("#teamNameUpdateTIMS").html("No value");
    }
    if (teamData.nameShortLocal === "") {
        $("#teamNameUpdate").val(teamData.nameShort);
        $("#teamNameUpdateLabel").removeClass("bg-success");
    } else {
        $("#teamNameUpdate").val(teamData.nameShortLocal);
        $("#teamNameUpdateLabel").addClass("bg-success");
    }

    if (teamData.organization) {
        $("#organizationUpdateTIMS").html(teamData.organization);
    } else {
        $("#organizationUpdateTIMS").html("No value");
    }
    if (teamData.organizationLocal === "") {
        $("#organizationUpdate").val(teamData.organization);
        $("#organizationUpdateLabel").removeClass("bg-success");
    } else {
        $("#organizationUpdate").val(teamData.organizationLocal);
        $("#organizationUpdateLabel").addClass("bg-success");
    }

    if (teamData.robotName) {
        $("#robotNameUpdateTIMS").html(teamData.robotName);
    } else {
        $("#robotNameUpdateTIMS").html("No value");
    }
    if (teamData.robotNameLocal === "") {
        $("#robotNameUpdate").val(teamData.robotName);
        $("#robotNameUpdateLabel").removeClass("bg-success");
    } else {
        $("#robotNameUpdate").val(teamData.robotNameLocal);
        $("#robotNameUpdateLabel").addClass("bg-success");
    }

    if (teamData.cityState) {
        $("#cityStateUpdateTIMS").html(teamData.cityState);
    } else {
        $("#cityStateUpdateTIMS").html("No value");
    }
    if (teamData.cityStateLocal === "") {
        $("#cityStateUpdate").val(teamData.cityState);
        $("#cityStateUpdateLabel").removeClass("bg-success");
    } else {
        $("#cityStateUpdate").val(teamData.cityStateLocal);
        $("#cityStateUpdateLabel").addClass("bg-success");
    }

    if (teamData.topSponsorsLocal === "") {
        $("#topSponsorsUpdate").val(teamData.topSponsors);
        $("#topSponsorsUpdateLabel").removeClass("bg-success");
    } else {
        $("#topSponsorsUpdate").val(teamData.topSponsorsLocal);
        $("#topSponsorsUpdateLabel").addClass("bg-success");
    }

    if (teamData.sponsorsLocal === "") {
        $("#sponsorsUpdate").val(teamData.sponsors);
        $("#sponsorsUpdateLabel").removeClass("bg-success");
    } else {
        $("#sponsorsUpdate").val(teamData.sponsorsLocal);
        $("#sponsorsUpdateLabel").addClass("bg-success");
    }

    if (teamData.awardsLocal === "") {
        //$("#awardsUpdate").val(teamData.awards);
        $("#awardsUpdate").html(teamData.awards);
        $("#awardsUpdateLabel").removeClass("bg-success");
    } else {
        //$("#awardsUpdate").val(teamData.awardsLocal);
        $("#awardsUpdate").html(teamData.awardsLocal);
        $("#awardsUpdateLabel").addClass("bg-success");
    }

    $("#teamMottoUpdate").val(teamData.teamMottoLocal);
    $("#teamMottoUpdateLabel").addClass("bg-success");

    $("#teamNotesUpdate").val(teamData.teamNotesLocal);
    $("#teamNotesUpdateLabel").addClass("bg-success");

    // Get all elements with class="tabcontent" and hide them
    $(".tabcontent").hide();

    // Show the current tab, and add an "active" class to the link that opened the tab
    $("#teamDataEntry").show();
}


function updateTeamInfoDone(cloudSave) {
    "use strict";
    var teamNumber = localStorage.currentTeam;
    var teamData = JSON.parse(localStorage["teamData" + teamNumber]);

    if ((teamData.nameShort !== $("#teamNameUpdate").val()) && ($("#teamNameUpdate").val() !== "")) {
        teamData.nameShortLocal = $("#teamNameUpdate").val();
        $("#teamTableName" + teamNumber).html($("#teamNameUpdate").val());
    } else {
        teamData.nameShortLocal = "";
        $("#teamTableName" + teamNumber).html(teamData.nameShort);
    }

    if ((teamData.cityState !== $("#cityStateUpdate").val()) && ($("#cityStateUpdate").val() !== "")) {
        teamData.cityStateLocal = $("#cityStateUpdate").val();
        $("#teamTableCityState" + teamNumber).html($("#cityStateUpdate").val());
    } else {
        teamData.cityStateLocal = "";
        $("#teamTableCityState" + teamNumber).html(teamData.cityState);
    }

    if (teamData.teamNotesLocal !== $("#teamNotesUpdate").val()) {
        teamData.teamNotesLocal = $("#teamNotesUpdate").val();
    }

    if ((teamData.topSponsors !== $("#topSponsorsUpdate").val()) && ($("#topSponsorsUpdate").val() !== "")) {
        teamData.topSponsorsLocal = $("#topSponsorsUpdate").val();
        $("#teamTableTopSponsors" + teamNumber).html($("#topSponsorsUpdate").val());
    } else {
        teamData.topSponsorsLocal = "";
        $("#teamTableTopSponsors" + teamNumber).html(teamData.topSponsors);
    }
    if ((teamData.sponsors !== $("#sponsorsUpdate").val()) && ($("#sponsorsUpdate").val() !== "")) {
        teamData.sponsorsLocal = $("#sponsorsUpdate").val();
        $("#teamTableSponsors" + teamNumber).html($("#sponsorsUpdate").val());
    } else {
        teamData.sponsorsLocal = "";
        $("#teamTableSponsors" + teamNumber).html(teamData.sponsors);
    }
    if ((teamData.organization !== $("#organizationUpdate").val()) && ($("#organizationUpdate").val() !== "")) {
        teamData.organizationLocal = $("#organizationUpdate").val();
        $("#teamTableOrganization" + teamNumber).html($("#organizationUpdate").val());
    } else {
        teamData.organizationLocal = "";
        $("#teamTableOrganization" + teamNumber).html(teamData.organization);
    }
    if ((teamData.robotName !== $("#robotNameUpdate").val()) && ($("#robotNameUpdate").val() !== "")) {
        teamData.robotNameLocal = $("#robotNameUpdate").val();
        $("#teamTableRobotName" + teamNumber).html($("#robotNameUpdate").val());
    } else {
        teamData.robotNameLocal = "";
        $("#teamTableRobotName" + teamNumber).html(teamData.robotName);
    }
//    if ((teamData.awards !== $("#awardsUpdate").val()) && ($("#awardsUpdate").val() !== "")) {
//        teamData.awardsLocal = $("#awardsUpdate").val();
//        $("#teamTableAwards" + teamNumber).html($("#awardsUpdate").val());
//    } else {
//        teamData.awardsLocal = "";
//        $("#teamTableAwards" + teamNumber).html(teamData.awards);
//    }
    
    if ($("#awardsUpdate").html() === "<br>") {$("#awardsUpdate").html("");}
    
    if ((teamData.awards !== $("#awardsUpdate").html()) && ($("#awardsUpdate").html() !== "")) {
        teamData.awardsLocal = $("#awardsUpdate").html();
        $("#teamTableAwards" + teamNumber).html($("#awardsUpdate").html());
    } else {
        teamData.awardsLocal = "";
        $("#teamTableAwards" + teamNumber).html(teamData.awards);
    }


    if (teamData.teamMottoLocal !== $("#teamMottoUpdate").val()) {
        teamData.teamMottoLocal = $("#teamMottoUpdate").val();
    }

    teamData.lastVisit = moment().format();

    localStorage["teamData" + teamNumber] = JSON.stringify(teamData);
    if (cloudSave) {
        teamUpdateCalls++;
        sendTeamUpdates(teamNumber);
        BootstrapDialog.show({
            message: "Team data saved to gatool Cloud. Thank you for sharing your local data for Team " + localStorage.currentTeam + " with the FIRST GA and MC community.",
            buttons: [{
                icon: 'glyphicon glyphicon-cloud-upload',
                label: 'OK',
                hotkey: 13, // Enter.
                title: 'OK',
                action: function (dialogRef) {
                    dialogRef.close();
                }
            }]
        });
    }
    // Get all elements with class="tabcontent" and hide them

    $(".tabcontent").hide();

    // Show the current tab, and add an "active" class to the link that opened the tab
    updateTeamTable();
    if ($("#announceDisplay").css("display") !== "none") {
        announceDisplay();
    }
    $("#teamdata").show();
    document.getElementById('teamDataTabPicker').click();
}

function rookieYearDisplay(year) {
    "use strict";
    var currrentYear = localStorage.currentYear;
    var years = currrentYear - year + 1;
    var yearTest = years.toString().slice(-1);
    var tag = "";
    switch (years) {
        case 1:
            return year + " (Rookie Year)";
        case 2:
            return year + " (2nd season)";
        case 3:
            return year + " (3rd season)";
        case 10:
            return year + " (10th season)";
        case 11:
            return year + " (11th season)";
        case 12:
            return year + " (12th season)";
        case 13:
            return year + " (13th season)";
        default:
            if (yearTest === "1") {
                tag = "st";
            } else if (yearTest === "2") {
                tag = "nd";
            } else if (yearTest === "3") {
                tag = "rd";
            } else {
                tag = "th";
            }
            return year + " (" + parseInt(currrentYear - year + 1) + tag + " season)";
    }
}

function resetLocalStorage() {
    "use strict";
    BootstrapDialog.show({
        type: 'type-danger',
        title: '<b>Reset Local Storage</b>',
        message: 'You are about to erase all of your local changes to team information. This action will effectively reset gatool to its "factory" condition. Are you sure you want to do this?',
        buttons: [{
            icon: 'glyphicon glyphicon-check',
            label: "No, don't reset my local changes.",
            hotkey: 78, // "N".
            cssClass: "btn btn-success col-md-5 col-xs-12 col-sm-12 alertButton",
            action: function (dialogRef) {
                dialogRef.close();
            }
        }, {
            icon: 'glyphicon glyphicon-refresh',
            label: 'Yes, I do want to reset my local changes.<br>I understand that I will now need to<br>re-enter my changes or<br>download them from the gatool cloud.',
            hotkey: 13, // Enter.
            cssClass: 'btn btn-danger col-md-5 col-xs-12 col-sm-12 alertButton',
            action: function (dialogRef) {
                dialogRef.close();
                localStorage.clear();
                BootstrapDialog.show({
                    message: "LocalStorage cleared.<br>Page will now reload to recover data from the server. Select your event after the page reloads.",
                    buttons: [{
                        icon: 'glyphicon glyphicon-refresh',
                        label: 'OK',
                        hotkey: 13, // Enter.
                        title: 'OK',
                        action: function (dialogRef) {
                            location.reload();
                        }
                    }]
                });

            }
        }]
    });
}

function logout() {
    "use strict";
    BootstrapDialog.show({
        type: 'type-primary',
        title: '<b>Logout of gatool</b>',
        message: 'You are about to logout of gatool. Your local changes will be preserved until you reset your browser cache, so your changes will be here when you login again on this device. Are you sure you want to do this?',
        buttons: [{
            icon: 'glyphicon glyphicon-check',
            label: "No, I don't want to logout now.",
            hotkey: 78, // "N".
            cssClass: "btn btn-info col-md-5 col-xs-12 col-sm-12 alertButton",
            action: function (dialogRef) {
                dialogRef.close();
            }
        }, {
            icon: 'glyphicon glyphicon-log-out',
            label: 'Yes, I do want to logout now.',
            hotkey: 13, // Enter.
            cssClass: 'btn btn-success col-md-5 col-xs-12 col-sm-12 alertButton',
            action: function (dialogRef) {
                dialogRef.close();
                location.href = "/logout";
            }
        }]
    });
}

function saveTeamUpdates() {
    //This function saves ALL of the team data to gatool Cloud.
    "use strict";
    BootstrapDialog.show({
        type: 'type-info',
        title: '<b>Save Team Updates to the gatool Cloud</b>',
        message: "<b>You are about to save your local updates to the gatool Cloud. <span class='danger'>This will replace data in gatool Cloud with the changes you have made to teams in this event</span>.</b><br>With great power comes great responsibility. To ensure the best experience for everyone, we ask that only the GAs and MCs who are working an event save their changes.<br>If you are not working at an event, <b>please do not save changes between Wednesday and Sunday during the competition season</b>. This policy will allow everyone to benefit from the on-site team's research.<br><b>Are you sure you want to do this?</b>",
        buttons: [{
            icon: 'glyphicon glyphicon-check',
            label: "No, don't save my updates now.",
            hotkey: 78, // "N".
            cssClass: "btn btn-info col-md-5 col-xs-12 col-sm-12 alertButton",
            action: function (dialogRef) {
                dialogRef.close();
            }
        }, {
            icon: 'glyphicon glyphicon-cloud-upload',
            label: 'Yes, save my updates now.',
            hotkey: 13, // Enter.
            cssClass: 'btn btn-success col-md-5 col-xs-12 col-sm-12 alertButton',
            action: function (dialogRef) {
                dialogRef.close();
                BootstrapDialog.show({
                    type: 'type-success',
                    icon: 'glyphicon glyphicon-thumbs-up',
                    title: '<b>Are you sure you want to upload Team Data for ' + localStorage.currentEvent + '?</b>',
                    message: "<span class = 'allianceAnnounceDialog'>Are you sure you want to upload Team Data for " + localStorage.currentEvent + "? You can upload data for a specific team from the Team Data Screen.</span>",
                    buttons: [{
                        icon: 'glyphicon glyphicon-thumbs-down',
                        label: 'No, I do not want to do this now.',
                        hotkey: 78, // "N".
                        cssClass: "btn btn-danger col-md-5 col-xs-12 col-sm-12 alertButton",
                        action: function (dialogRef) {
                            dialogRef.close();
                        }
                    }, {
                        icon: 'glyphicon glyphicon-thumbs-up',
                        cssClass: "btn btn-success col-md-5 col-xs-12 col-sm-12 alertButton",
                        label: 'Yes, I do want to do this now.',
                        hotkey: 13, // Enter.
                        action: function (dialogRef) {
                            dialogRef.close();
                            //var teamData = JSON.parse(localStorage.teamList);
                            var teamData = eventTeamList.slice(0);
                            for (var i = 0; i < teamData.length; i++) {
                                teamUpdateCalls++;
                                sendTeamUpdates(teamData[i].teamNumber);
                            }
                            BootstrapDialog.show({
                                message: "Team data saved to gatool Cloud. Thank you for sharing your local data for " + localStorage.currentEvent + " with the FIRST GA and MC community.",
                                buttons: [{
                                    icon: 'glyphicon glyphicon-cloud-upload',
                                    cssClass: "btn btn-success col-md-5 col-xs-12 col-sm-12 alertButton",
                                    label: 'OK',
                                    hotkey: 13, // Enter.
                                    title: 'OK',
                                    action: function (dialogRef) {
                                        dialogRef.close();
                                    }
                                }]
                            });
                        }
                    }]
                });
            }
        }]
    });
}

function saveTeamUpdate() {
    //This function saves the team stored in localStorage.currentTeam's data to gatool Cloud.
    "use strict";
    BootstrapDialog.show({
        type: 'type-info',
        title: '<b>Save Team ' + localStorage.currentTeam + ' Update to the gatool Cloud</b>',
        message: "<b>You are about to save your local updates to the gatool Cloud. <span class='danger'>This will replace data in gatool Cloud with the changes you have made to this specific team in this event</span>.</b><br>With great power comes great responsibility. To ensure the best experience for everyone, we ask that only the GAs and MCs who are working an event save their changes.<br>If you are not working at an event, <b>please do not save changes between Wednesday and Sunday during the competition season</b>. This policy will allow everyone to benefit from the on-site team's research.<br><b>Are you sure you want to do this?</b>",
        buttons: [{
            icon: 'glyphicon glyphicon-check',
            label: "No, don't save this update now.",
            hotkey: 78, // "N".
            cssClass: "btn btn-info col-md-5 col-xs-12 col-sm-12 alertButton",
            action: function (dialogRef) {
                dialogRef.close();
            }
        }, {
            icon: 'glyphicon glyphicon-cloud-upload',
            label: 'Yes, save this update now.',
            hotkey: 13, // Enter.
            cssClass: 'bth btn-success col-md-5 col-xs-12 col-sm-12 alertButton',
            action: function (dialogRef) {
                dialogRef.close();
                updateTeamInfoDone("true");
            }
        }]
    });
}


function loadTeamUpdates() {
    "use strict";
    BootstrapDialog.show({
        type: 'type-warning',
        title: '<b>Load Team Updates from the gatool Cloud</b>',
        message: 'You are about to load team data updates from the gatool Cloud. <b>This will replace your local changes to the teams in this event</b> with the data you <b><i>or others</i></b> may have stored in the gatool Cloud.<br><b>Are you sure you want to do this?</b>',
        buttons: [{
            icon: 'glyphicon glyphicon-check',
            label: "No, I don't want to load updates now.",
            hotkey: 78, // "N".
            cssClass: "btn btn-info col-md-5 col-xs-12 col-sm-12 alertButton",
            action: function (dialogRef) {
                dialogRef.close();
            }
        }, {
            icon: 'glyphicon glyphicon-cloud-download',
            label: 'Yes, I do want to load updates now.',
            hotkey: 13, // Enter.
            cssClass: 'btn btn-success col-md-5 col-xs-12 col-sm-12 alertButton',
            action: function (dialogRef) {
                dialogRef.close();
                //var teamData = JSON.parse(localStorage.teamList);
                var teamData = eventTeamList.slice(0);

                for (var i = 0; i < teamData.length; i++) {
                    teamUpdateCalls++;
                    getTeamUpdates(teamData[i].teamNumber);
                }
                BootstrapDialog.show({
                    message: "Team data loaded from gatool Cloud. Your local data for " + localStorage.currentEvent + " is now showing data from the FIRST GA and MC community.",
                    buttons: [{
                        icon: 'glyphicon glyphicon-cloud-download',
                        cssClass: 'btn btn-success col-md-5 col-xs-12 col-sm-12 alertButton',
                        label: 'OK',
                        hotkey: 13, // Enter.
                        title: 'OK',
                        action: function (dialogRef) {
                            dialogRef.close();
                            updateTeamTable();
                            if ($("#announceDisplay").css("display") !== "none") {
                                announceDisplay();
                            }
                        }
                    }]
                });
            }
        }]
    });
}

function loadTeamUpdate() {
    "use strict";
    var currentTeam = localStorage.currentTeam;
    BootstrapDialog.show({
        type: 'type-warning',
        title: '<b>Load Team Updates for ' + currentTeam + ' from the gatool Cloud</b>',
        message: 'You are about to load team data updates for Team ' + currentTeam + 'from the gatool Cloud. <b>This will replace your local changes to this team</b> with the data you <b><i>or others</i></b> may have stored in the gatool Cloud.<br><b>Are you sure you want to do this?</b>',
        buttons: [{
            icon: 'glyphicon glyphicon-check',
            label: "No, I don't want to load updates now.",
            hotkey: 78, // "N".
            cssClass: "btn btn-info col-md-5 col-xs-12 col-sm-12 alertButton",
            action: function (dialogRef) {
                dialogRef.close();
            }
        }, {
            icon: 'glyphicon glyphicon-cloud-download',
            label: 'Yes, I do want to load updates now.',
            hotkey: 13, // Enter.
            cssClass: 'btn btn-success col-md-5 col-xs-12 col-sm-12 alertButton',
            action: function (dialogRef) {
                dialogRef.close();
                teamUpdateCalls++;
                getTeamUpdates(currentTeam);
                BootstrapDialog.show({
                    message: "Team data loaded from gatool Cloud. Your local data for " + currentTeam + " is now showing data from the FIRST GA and MC community.",
                    buttons: [{
                        icon: 'glyphicon glyphicon-cloud-download',
                        cssClass: 'btn btn-success col-md-5 col-xs-12 col-sm-12 alertButton',
                        label: 'OK',
                        hotkey: 13, // Enter.
                        title: 'OK',
                        action: function (dialogRef) {
                            dialogRef.close();
                            updateTeamTable();
                            updateTeamInfo(currentTeam);
                            if ($("#announceDisplay").css("display") !== "none") {
                                announceDisplay();
                            }
                        }
                    }]
                });
            }
        }]
    });
}

function resetAwards() {
    "use strict";
    BootstrapDialog.show({
        type: 'type-warning',
        title: '<b>Reset the locally stored Team Awards</b>',
        message: 'You are about to reset your team awards updates for <b>' + localStorage.eventName + '</b> in your local gatool. <b>This will replace your local changes for this event</b> with the data from TIMS. The freshly loaded awards data will be formatted according to your settings on the Setup Screen.<br><b>Are you sure you want to do this?</b>',
        buttons: [{
            icon: 'glyphicon glyphicon-check',
            label: "No, I don't want to reset now.",
            hotkey: 78, // "N".
            cssClass: "btn btn-info col-md-5 col-xs-12 col-sm-12 alertButton",
            action: function (dialogRef) {
                dialogRef.close();
            }
        }, {
            icon: 'glyphicon glyphicon-cloud-download',
            label: 'Yes, I do want to reset now.',
            hotkey: 13, // Enter.
            cssClass: 'btn btn-success col-md-5 col-xs-12 col-sm-12 alertButton',
            action: function (dialogRef) {
                dialogRef.close();
                BootstrapDialog.show({
                    type: 'type-warning',
                    title: '<b>Reset the locally stored Team Awards</b>',
                    message: "Are you sure you want to reset your team awards updates for <b>" + localStorage.eventName + "</b> in your local gatool? <b>This will replace your local changes for this event</b> with the data from TIMS.",
                    buttons: [{
                        icon: 'glyphicon glyphicon-check',
                        label: "No, I don't want to reset now.",
                        hotkey: 78, // "N".
                        cssClass: "btn btn-info col-md-5 col-xs-12 col-sm-12 alertButton",
                        action: function (dialogRef) {
                            dialogRef.close();
                        }
                    }, {
                        icon: 'glyphicon glyphicon-cloud-download',
                        cssClass: "btn btn-success col-md-5 col-xs-12 col-sm-12 alertButton",
                        label: 'OK',
                        hotkey: 13, // Enter.
                        title: 'OK',
                        action: function (dialogRef) {
                            dialogRef.close();
                            var teamData = eventTeamList.slice(0);
                            for (var i = 0; i < teamData.length; i++) {
                                var team = JSON.parse(localStorage["teamData" + teamData[i].teamNumber]);
                                team.awardsLocal = "";
                                localStorage["teamData" + teamData[i].teamNumber] = JSON.stringify(team);
                            }
                            updateTeamTable();
                            if ($("#announceDisplay").css("display") !== "none") {
                                announceDisplay();
                            }
                        }

                    }]
                });
            }
        }]
    });
}

function timer() {
    "use strict";
    if (localStorage.clock === "running") {
        // Update the count down every 1 second

        // Get todays date and time
        localStorage.matchTimer -= 1;
        if (localStorage.matchTimer >= 0) {
            if ((matchLength - localStorage.matchTimer) <= autoLength) {
                $("#timer").css({
                    "background-color": "orange",
                    "color": "black"
                });
                $("#clock").html(localStorage.matchTimer + " AUTO (" + (autoLength - (matchLength - localStorage.matchTimer)) + ")");
            }
            if ((matchLength - localStorage.matchTimer) > autoLength && (localStorage.matchTimer > endGame)) {
                $("#timer").css({
                    "background-color": "green",
                    "color": "white"
                });
                $("#clock").html(localStorage.matchTimer + " TELEOP");
            }
            if (localStorage.matchTimer <= endGame) {
                $("#timer").css({
                    "background-color": "red",
                    "animation-delay": "20s",
                    "animation-name": "timerHighlight",
                    "animation-duration": "1s",
                    "animation-iteration-count": "10",
                    "color": "white"
                });
                $("#clock").html(localStorage.matchTimer + " ENDGAME");
            }
        } else {
            resetTimer();
        }


    }

    //display the delay on the Announce Screen if we have a schedule
    if (localStorage.qualsList !== '{"Schedule":[]}') {
        var timeDifference = 0;
        if (currentMatchData.actualStartTime) {
            $("#matchTime").html('<b><span id="currentTime"></span></b><br>Actual match time:<br>' + moment(currentMatchData.actualStartTime).format("MMM Do, h:mm a"));
            $("#matchTimeContainer").removeClass();
            $("#matchTimeContainer").addClass("col2");
            timeDifference = moment(currentMatchData.actualStartTime).diff(currentMatchData.startTime, "minutes");
            if (timeDifference < 0) {
                $("#matchTimeContainer").addClass("alert-success");
            } else if ((timeDifference >= 0) && (timeDifference < 10)) {
                $("#matchTimeContainer").addClass("alert-success");
            } else if ((timeDifference >= 10) && (timeDifference < 20)) {
                $("#matchTimeContainer").addClass("alert-warning");
            } else if (timeDifference >= 20) {
                $("#matchTimeContainer").addClass("alert-danger");
            }
        } else {
            if (localStorage.offseason === "true") {
                $("#matchTime").html('<b><span id="currentTime"></span></b><br>Starts:<br>' + currentMatchData.startTime);
            } else {
            $("#matchTime").html('<b><span id="currentTime"></span></b><br>Starts:<br>' + moment(currentMatchData.startTime).fromNow());
            
            timeDifference = moment(Date.now()).diff(currentMatchData.startTime, "minutes");
            if (timeDifference < 0) {
                $("#matchTimeContainer").addClass("alert-success");
            } else if ((timeDifference >= 0) && (timeDifference < 10)) {
                $("#matchTimeContainer").addClass("alert-success");
            } else if ((timeDifference >= 10) && (timeDifference < 20)) {
                $("#matchTimeContainer").addClass("alert-warning");
            } else if (timeDifference >= 20) {
                $("#matchTimeContainer").addClass("alert-danger");
            }
            }
            $("#matchTimeContainer").removeClass();
            $("#matchTimeContainer").addClass("col2");
        }
    }
    $("#currentTime").html(moment().format('h:mm:ss a'));

    //display the last pit visit time
    $("[lastVisit]").each(function () {
        if ($(this).attr("lastvisit") !== "No recent visit") {
            $(this).html(moment($(this).attr("lastVisit")).fromNow());
        }
    });
}

function parsePlayoffMatchName(matchName) {
    "use strict";
    var matchArray = matchName.split(" ");
    if ((matchArray[0] === "Quarterfinal") && (matchArray[1] <= 4)) {
        return "Quarterfinal " + matchArray[1] + " Match 1";
    }
    if ((matchArray[0] === "Quarterfinal") && (matchArray[1] > 4)) {
        if (playoffResults["Quarterfinal " + (matchArray[1] - 4)] === "Red") {
            return "Quarterfinal " + (matchArray[1] - 4) + " Match 2 <br><span class='redScoreWin'>Advantage " + playoffResults["Quarterfinal " + (matchArray[1] - 4)] + "</span>";
        } else if (playoffResults["Quarterfinal " + (matchArray[1] - 4)] === "Blue") {
            return "Quarterfinal " + (matchArray[1] - 4) + " Match 2 <br><span class='blueScoreWin'>Advantage " + playoffResults["Quarterfinal " + (matchArray[1] - 4)] + "</span>";
        } else if (playoffResults["Quarterfinal " + (matchArray[1] - 4)] === "No results yet") {
            return "Quarterfinal " + (matchArray[1] - 4) + " Match 2 <br>First match not reported yet";
        } else {
            return "Quarterfinal " + (matchArray[1] - 4) + " Match 2 <br>First match tied";
        }
    }

    if ((matchArray[0] === "Semifinal") && (matchArray[1] <= 2)) {
        return "Semifinal " + matchArray[1] + " Match 1";
    }

    if ((matchArray[0] === "Semifinal") && (matchArray[1] > 2)) {
        if (playoffResults["Semifinal " + (matchArray[1] - 2)] === "Red") {
            return "Semifinal " + (matchArray[1] - 2) + " Match 2<br><span class='redScoreWin'>Advantage " + playoffResults["Semifinal " + (matchArray[1] - 2)] + "</span>";
        } else if (playoffResults["Semifinal " + (matchArray[1] - 2)] === "Blue") {
            return "Semifinal " + (matchArray[1] - 2) + " Match 2<br><span class='blueScoreWin'>Advantage " + playoffResults["Semifinal " + (matchArray[1] - 2)] + "</span>";
        } else if (playoffResults["Semifinal " + (matchArray[1] - 2)] === "No results yet") {
            return "Semifinal " + (matchArray[1] - 2) + " Match 2<br>First match not reported yet";
        } else {
            return "Semifinal " + (matchArray[1] - 2) + " Match 2<br>First match tied";
        }

    }
    if (matchArray[0] === "Tiebreaker") {
        return matchArray[0] + " " + (matchArray[1] || "");
    }

    if (matchArray[0] === "Final") {
        if (matchArray[1] === "2") {
            if (playoffResults["Final 1"] === "Red") {
                return matchArray[0] + " " + (matchArray[1] || "") + "<br><span class='redScoreWin'>Advantage Red</span>";
            } else if (playoffResults["Final 1"] === "Blue") {
                return matchArray[0] + " " + (matchArray[1] || "") + "<br><span class='blueScoreWin'>Advantage Blue</span>";
            } else if (playoffResults["Final 1"] === "No results yet") {
                return matchArray[0] + " " + (matchArray[1] || "") + "<br>First match not reported yet";
            } else {
                return matchArray[0] + " " + (matchArray[1] || "") + "<br>First match tied";
            }
        }
        return matchArray[0] + " " + (matchArray[1] || "");
    }

}

function startTimer() {
    "use strict";
    if (localStorage.clock === "running") {
        resetTimer();
    } else {
        localStorage.clock = "running";
    }
}

function resetTimer() {
    "use strict";
    localStorage.matchTimer = matchLength;
    $("#timer").css({
        "background-color": "white",
        "animation-delay": "0s",
        "animation-name": "timerReset",
        "animation-duration": "1s",
        "animation-iteration-count": "1",
        "color": "black"
    });
    localStorage.clock = "ready";
    $("#clock").html("Tap for match timer");
}

function inChamps() {
    "use strict";
    if (champs.indexOf(localStorage.currentEvent) >= 0) {
        return true;
    } else {
        return false;
    }
}

function inDivision() {
    "use strict";
    if (champDivisions.indexOf(localStorage.currentEvent) >= 0) {
        return true;
    } else {
        return false;
    }
}

function inSubdivision() {
    "use strict";
    if (champSubdivisions.indexOf(localStorage.currentEvent) >= 0) {
        return true;
    } else {
        return false;
    }
}

function inMiChamps() {
    "use strict";
    if (miChamps.indexOf(localStorage.currentEvent) >= 0) {
        return true;
    } else {
        return false;
    }
}

function inMiDivision() {
    "use strict";
    if (miDivisions.indexOf(localStorage.currentEvent) >= 0) {
        return true;
    } else {
        return false;
    }
}

function awardsHilight(awardName) {
    "use strict";
    if (awardName === "District Chairman's Award" || awardName === "District Event Winner" || awardName === "District Event Finalist" || awardName === "Regional Engineering Inspiration Award" || awardName === "District Engineering Inspiration Award" || awardName === "District Championship Finalist" || awardName === "District Championship Winner" || awardName === "Regional Winners" || awardName === "Regional Finalists" || awardName === "Regional Chairman's Award" || awardName === "FIRST Dean's List Finalist Award" || awardName === "Championship Subdivision Winner" || awardName === "Championship Subdivision Finalist" || awardName === "Championship Winner" || awardName === "Championship Finalist" || awardName === "Chairman's Award" || awardName === "FIRST Dean's List Award" || awardName === "Woodie Flowers Award") {
        return {
            "before": "<span class ='awardHilight'>",
            "after": "</span>"
        };
    } else {
        return {
            "before": "<span>",
            "after": "</span>"
        };
    }
}

function handleQualsFiles(e) {
    "use strict";
    var rABS = true; // true: readAsBinaryString ; false: readAsArrayBuffer

    var files = e.target.files;
    var i, f;
    for (i = 0; i !== files.length; ++i) {
        f = files[i];
        var reader = new FileReader();
        reader.onload = function (e) {
            var data = e.target.result;

            var workbook;
            if (rABS) {
                /* if binary string, read with type 'binary' */
                workbook = XLSX.read(data, {
                    type: 'binary'
                });
            } else {
                /* if array buffer, convert to base64 */
                var arr = fixdata(data);
                workbook = XLSX.read(btoa(arr), {
                    type: 'base64'
                });
            }

            /* DO SOMETHING WITH workbook HERE */
            var worksheet = workbook.Sheets[workbook.SheetNames[0]];
            var schedule = XLSX.utils.sheet_to_json(worksheet, {
                range: 4
            });
            var formattedSchedule = {};
            var innerSchedule = [];
            var teamListArray = [];
            var teamList = [];
            var teamToInsert = {};
            var teamTable = "";

            for (var i = 0; i < schedule.length; i++) {
                if (schedule[i].Match) {
                    var tempRow = {
                        "description": schedule[i].Description,
                        "tournamentLevel": "Qualification",
                        "matchNumber": schedule[i].Match,
                        "startTime": schedule[i].Time,
                        "actualStartTime": "",
                        "postResultTime": "",
                        "scoreRedFinal": "",
                        "scoreRedFoul": "",
                        "scoreRedAuto": "",
                        "scoreBlueFinal": "",
                        "scoreBlueFoul": "",
                        "scoreBlueAuto": "",
                        "Teams": [{
                            "teamNumber": schedule[i]["Red 1"],
                            "station": "Red1",
                            "surrogate": false,
                            "dq": false
                        }, {
                            "teamNumber": schedule[i]["Red 2"],
                            "station": "Red2",
                            "surrogate": false,
                            "dq": false
                        }, {
                            "teamNumber": schedule[i]["Red 3"],
                            "station": "Red3",
                            "surrogate": false,
                            "dq": false
                        }, {
                            "teamNumber": schedule[i]["Blue 1"],
                            "station": "Blue1",
                            "surrogate": false,
                            "dq": false
                        }, {
                            "teamNumber": schedule[i]["Blue 2"],
                            "station": "Blue2",
                            "surrogate": false,
                            "dq": false
                        }, {
                            "teamNumber": schedule[i]["Blue 3"],
                            "station": "Blue3",
                            "surrogate": false,
                            "dq": false
                        }]
                    };
                    if (teamListArray.indexOf(schedule[i]["Red 1"]) === -1) {
                        teamListArray.push(schedule[i]["Red 1"]);
                    }
                    if (teamListArray.indexOf(schedule[i]["Red 2"]) === -1) {
                        teamListArray.push(schedule[i]["Red 2"]);
                    }
                    if (teamListArray.indexOf(schedule[i]["Red 3"]) === -1) {
                        teamListArray.push(schedule[i]["Red 3"]);
                    }
                    if (teamListArray.indexOf(schedule[i]["Blue 1"]) === -1) {
                        teamListArray.push(schedule[i]["Blue 1"]);
                    }
                    if (teamListArray.indexOf(schedule[i]["Blue 2"]) === -1) {
                        teamListArray.push(schedule[i]["Blue 2"]);
                    }
                    if (teamListArray.indexOf(schedule[i]["Blue 3"]) === -1) {
                        teamListArray.push(schedule[i]["Blue 3"]);
                    }

                    innerSchedule.push(tempRow);
                }
            }
            formattedSchedule.Schedule = innerSchedule;
            
            teamListArray.sort(function(a, b){return a-b;});
            
            for (i=0;i<teamListArray.length;i++){
                teamToInsert = {"teamNumber":teamListArray[i]};
                teamList.push(teamToInsert);
            }
            
            $("#eventTeamCount").html(teamList.length);
            
            $('#teamsContainer').html('<p class = "eventName">' + localStorage.eventName + '</p><p>This table is editable. Tap on a team number to change data for a specific team. Edits you make are local to this browser, and they will persist here if you do not clear your browser cache. You can save your changes to the gatool Cloud on the team details page or on the Setup Screen. Cells <span class="bg-success"> highlighted in green</span> have been modified, either by you or by other gatool users. </p><table id="teamsTable" class="table table-condensed table-responsive table-bordered table-striped"></table><p><button type="button" id="billAucoinNuclearOption" class="btn btn-danger" onclick="resetAwards()">Reset stored awards to their TIMS values</button></p>');
            teamTable += '<thead  id="teamsTableHead" class="thead-default"><tr><td class="col1"><b>Team #</b></td><td class="col1"><b>Rank</b></td><td class="col2"><b>Team Name</b></td><td class="col2"><b>City</b></td><td class="col2"><b>Top 5 Sponsors</b></td><td class="col2"><b>Organization</b></td><td class="col1"><b>Rookie Year</b></td><td class="col1"><b>Robot name</b></td></tr></thead><tbody></tbody>';
            $('#teamsTable').html(teamTable);
            
            getTeamData(teamList,localStorage.currentYear);
            
            localStorage.qualsList = JSON.stringify(formattedSchedule);
            getHybridSchedule();
            $("#QualsFiles").hide();
            $("#QualsFilesReset").show();
        };
        reader.readAsBinaryString(f);
    }


}

function handlePlayoffFiles(e) {
    "use strict";
    var rABS = true; // true: readAsBinaryString ; false: readAsArrayBuffer

    var files = e.target.files;
    var i, f;
    for (i = 0; i !== files.length; ++i) {
        f = files[i];
        var reader = new FileReader();
        reader.onload = function (e) {
            var data = e.target.result;

            var workbook;
            if (rABS) {
                /* if binary string, read with type 'binary' */
                workbook = XLSX.read(data, {
                    type: 'binary'
                });
            } else {
                /* if array buffer, convert to base64 */
                var arr = fixdata(data);
                workbook = XLSX.read(btoa(arr), {
                    type: 'base64'
                });
            }

            /* DO SOMETHING WITH workbook HERE */
            var worksheet = workbook.Sheets[workbook.SheetNames[0]];
            var schedule = XLSX.utils.sheet_to_json(worksheet, {
                range: 4
            });
            var formattedSchedule = {};
            var innerSchedule = [];
            for (var i = 0; i < schedule.length; i++) {
                if (schedule[i].Match) {
                    var tempRow = {
                        "description": schedule[i].Description,
                        "tournamentLevel": "Playoff",
                        "matchNumber": schedule[i].Match,
                        "startTime": schedule[i].Time,
                        "actualStartTime": "",
                        "postResultTime": "",
                        "scoreRedFinal": "",
                        "scoreRedFoul": "",
                        "scoreRedAuto": "",
                        "scoreBlueFinal": "",
                        "scoreBlueFoul": "",
                        "scoreBlueAuto": "",
                        "Teams": [{
                            "teamNumber": schedule[i]["Red 1"],
                            "station": "Red1",
                            "surrogate": false,
                            "dq": false
                        }, {
                            "teamNumber": schedule[i]["Red 2"],
                            "station": "Red2",
                            "surrogate": false,
                            "dq": false
                        }, {
                            "teamNumber": schedule[i]["Red 3"],
                            "station": "Red3",
                            "surrogate": false,
                            "dq": false
                        }, {
                            "teamNumber": schedule[i]["Blue 1"],
                            "station": "Blue1",
                            "surrogate": false,
                            "dq": false
                        }, {
                            "teamNumber": schedule[i]["Blue 2"],
                            "station": "Blue2",
                            "surrogate": false,
                            "dq": false
                        }, {
                            "teamNumber": schedule[i]["Blue 3"],
                            "station": "Blue3",
                            "surrogate": false,
                            "dq": false
                        }]
                    };
                    innerSchedule.push(tempRow);
                }   
            }
            formattedSchedule.Schedule = innerSchedule;
            localStorage.playoffList = JSON.stringify(formattedSchedule);
            getHybridSchedule();
            $("#PlayoffFiles").hide();
            $("#PlayoffFilesReset").show();
        };
        reader.readAsBinaryString(f);
    }

}

function toJSON(dataGrid, headerNames, headerTypes, newLine) {
    "use strict";
    //inits...
    var commentLine = "//";
    var commentLineEnd = "";
    var outputText = "[";
    var numRows = dataGrid.length;
    var numColumns = headerNames.length;

    //begin render loop
    for (var i = 0; i < numRows; i++) {
        var row = dataGrid[i];
        var rowOutput = "";
        outputText += "{";
        for (var j = 0; j < numColumns; j++) {
            if ((headerTypes[j] === "int") || (headerTypes[j] === "float")) {
                rowOutput = row[j] || "null";
            } else {
                rowOutput = '"' + (row[j] || "") + '"';
            }

            outputText += ('"' + headerNames[j] + '"' + ":" + rowOutput);

            if (j < (numColumns - 1)) {
                outputText += ",";
            }
        }
        outputText += "}";
        if (i < (numRows - 1)) {
            outputText += "," + newLine;
        }
    }
    outputText += "]";

    return outputText;
}

function handleQualsFilesReset() {
    "use strict";
    clearFileInput("QualsFiles");
    document.getElementById("QualsFiles").addEventListener('change', handleQualsFiles, false);
    $("#QualsFiles").show();
    $("#QualsFilesReset").hide();
    localStorage.qualsList = '{"Schedule":[]}';
    getOffseasonSchedule();

}

function handlePlayoffFilesReset() {
    "use strict";
    clearFileInput("PlayoffFiles");
    document.getElementById("PlayoffFiles").addEventListener('change', handlePlayoffFiles, false);
    $("#PlayoffFiles").show();
    $("#PlayoffFilesReset").hide();
    localStorage.playoffList = '{"Schedule":[]}';
    getOffseasonSchedule();
}

function clearFileInput(id) {
    "use strict";
    var oldInput = document.getElementById(id);

    var newInput = document.createElement("input");

    newInput.type = "file";
    newInput.id = oldInput.id;
    newInput.name = oldInput.name;
    newInput.className = oldInput.className;
    newInput.style.cssText = oldInput.style.cssText;
    // TODO: copy any other relevant attributes 

    oldInput.parentNode.replaceChild(newInput, oldInput);
}
