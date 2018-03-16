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
if (!localStorage.eventFilters) {
	localStorage.eventFilters = JSON.stringify(["future"]);
}
if (!localStorage.currentEventList) {
	localStorage.currentEventList = [];
}

// reset some of those variables, which will be adjusted later.
localStorage.clock = "ready";
localStorage.matchHighScore = 0;
localStorage.highScoreDetails = "{}";

// Cache the prior years events to reduce server calls.

localStorage.events2015 = '{"ABCA":"Western Canada Regional","ARCHIMEDES":"FIRST Championship - Archimedes Subdivision","ARFA":"Arkansas Rock City Regional","ARTE":"FIRST Championship - ARTE Division","AUSY":"Australia Regional","AZCH":"Arizona East Regional","AZPX":"Arizona West Regional","CALB":"Los Angeles Regional sponsored by The Roddenberry Foundation","CAMA":"Central Valley Regional","CARM":"Inland Empire Regional","CARSON":"FIRST Championship - Carson Subdivision","CARVER":"FIRST Championship - Carver Subdivision","CASA":"Sacramento Regional","CASD":"San Diego Regional ","CASJ":"Silicon Valley Regional sponsored by Google.org","CAVE":"Ventura Regional","CMP":"FIRST Championship","CODE":"Colorado Regional","CTHAR":"NE District - Hartford Event","CTWAT":"NE District - Waterbury Event","CUCA":"FIRST Championship - CUCA Division","CURIE":"FIRST Championship - Curie Subdivision","DCWA":"Greater DC Regional","FLFO":"South Florida Regional ","FLOR":"Orlando Regional","GACA":"FIRST Championship - GACA Division","GADU":"Peachtree Regional","GALILEO":"FIRST Championship - Galileo Subdivision","GAPE":"Georgia Southern Classic Regional","HIHO":"Hawaii Regional","HOPPER":"FIRST Championship - Hopper Subdivision","ILCH":"Midwest Regional","ILIL":"Central Illinois Regional","INCMP":"Indiana FIRST District Championship","ININD":"IN District - Indianapolis Event","INKOK":"IN District - Kokomo City of Firsts Event sponsored by AndyMark","INWLA":"IN District - Purdue Event","IRI":"Indiana Robotics Invitational","ISTA":"Israel Regional","LAKE":"Bayou Regional","MABOS":"NE District - Northeastern University Event","MANDA":"NE District - UMass - Dartmouth Event","MAREA":"NE District - Reading Event","MASPR":"NE District - Pioneer Valley Event","MDCP":"Chesapeake Regional","MELEW":"NE District - Pine Tree Event","MIBED":"FIM District - Bedford Event","MICEN":"FIM District - Center Line Event","MICMP":"FIRST in Michigan District Championship","MIESC":"FIM District - Escanaba Event","MIFLA":"FIM District - Woodhaven Event","MIGUL":"FIM District - Gull Lake Event","MIHOW":"FIM District - Howell Event","MIKEN":"FIM District - Kentwood Event","MIKET":"FIM District - Kettering University Event","MILAN":"FIM District - Lansing Event","MILIV":"FIM District - Livonia Event","MIMID":"FIM District - Great Lakes Bay Region Event","MISJO":"FIM District - St. Joseph Event","MISOU":"FIM District - Southfield Event","MISTA":"FIM District - Standish Event","MITRY":"FIM District - Troy Event","MITVC":"FIM District - Traverse City Event","MIWAT":"FIM District - Waterford Event","MIWMI":"FIM District - West Michigan Event","MNDU":"Lake Superior Regional","MNDU2":"Northern Lights Regional","MNMI":"Minnesota 10000 Lakes Regional","MNMI2":"Minnesota North Star Regional","MOKC":"Greater Kansas City Regional","MOSL":"St. Louis Regional","MRCMP":"Mid-Atlantic Robotics District Championship","MXMC":"Mexico City Regional ","NCRE":"North Carolina Regional","NECMP":"NE FIRST District Championship presented by United Technologies","NEHO":"FIRST Championship - NEHO Division","NEWTON":"FIRST Championship - Newton Subdivision","NHDUR":"NE District - UNH Event","NHNAS":"NE District - Granite State Event","NJBRI":"MAR District - Bridgewater-Raritan Event","NJFLA":"MAR District - Mt. Olive Event","NJNBR":"MAR District - North Brunswick Event","NJTAB":"MAR District - Seneca Event","NVLV":"Las Vegas Regional","NYLI":"SBPLI Long Island Regional","NYNY":"New York City Regional","NYRO":"Finger Lakes Regional ","NYTR":"New York Tech Valley Regional","OHCI":"Queen City Regional","OHCL":"Buckeye Regional","OKOK":"Oklahoma Regional ","ONNB":"North Bay Regional","ONTO":"Greater Toronto East Regional ","ONTO2":"Greater Toronto Central Regional","ONWA":"Waterloo Regional ","ONWI":"Windsor Essex Great Lakes Regional","ORORE":"PNW District - Oregon City Event","ORPHI":"PNW District - Philomath Event","ORWIL":"PNW District - Wilsonville Event","PADRE":"MAR District - Upper Darby Event","PAHAT":"MAR District - Hatboro-Horsham Event","PAPHI":"MAR District - Springside Chestnut Hill Event","PAPI":"Greater Pittsburgh Regional","PNCMP":"Pacific Northwest District Championship","QCMO":"FRC Festival de Robotique - Montreal Regional","RISMI":"NE District - Rhode Island Event","SCMB":"Palmetto Regional","TESLA":"FIRST Championship - Tesla Subdivision","TNKN":"Smoky Mountains Regional","TXDA":"Dallas Regional","TXHO":"Lone Star Regional","TXLU":"Hub City Regional","TXSA":"Alamo Regional sponsored by Rackspace Hosting","UTWV":"Utah Regional","VARI":"Virginia Regional","WAAHS":"PNW District - Auburn Event","WAAMV":"PNW District - Auburn Mountainview Event","WAELL":"PNW District - Central Washington University Event","WAMOU":"PNW District - Mount Vernon Event","WASHO":"PNW District - Shorewood Event","WASNO":"PNW District - Glacier Peak Event","WASPO":"PNW District - West Valley Event","WIMI":"Wisconsin Regional"}';
localStorage.events2016 = '{"ABCA":"Western Canada Regional","ALHU":"Rocket City Regional","ARCHIMEDES":"FIRST Championship - Archimedes Subdivision","ARLR":"Arkansas Rock City Regional","ARTE":"FIRST Championship - ARTE Division","AUSY":"Australia Regional","AZFL":"Arizona North Regional","AZPX":"Arizona West Regional","CADA":"Sacramento Regional","CALB":"Los Angeles Regional","CAMA":"Central Valley Regional","CAPL":"Orange County Regional","CARSON":"FIRST Championship - Carson Subdivision","CARVER":"FIRST Championship - Carver Subdivision","CASD":"San Diego Regional","CASJ":"Silicon Valley Regional presented by Google.org","CAVE":"Ventura Regional","CHCMP":"FIRST Chesapeake District Championship sponsored by Booz Allen Hamilton","CMP":"FIRST Championship","CODE":"Colorado Regional","CTHAR":"NE District - Hartford Event","CTWAT":"NE District - Waterbury Event","CUCA":"FIRST Championship - CUCA Division","CURIE":"FIRST Championship - Curie Subdivision","FLOR":"Orlando Regional","FLWP":"South Florida Regional ","GAALB":"PCH District - Albany Event","GACA":"FIRST Championship - GACA Division","GACMP":"Peachtree District State Championship","GACOL":"PCH District - Columbus Event","GADAL":"PCH District - Dalton Event","GAKEN":"PCH District - Kennesaw Event","GALILEO":"FIRST Championship - Galileo Subdivision","HEAT":"Summer Heat","HIHO":"Hawaii Regional","HOPPER":"FIRST Championship - Hopper Subdivision","IACF":"Iowa Regional","IDBO":"Idaho Regional","ILCH":"Midwest Regional","ILPE":"Central Illinois Regional","INCMP":"Indiana State Championship","INPMH":"IN District - Perry Meridian Event","INWCH":"IN District - Walker Warren Event","INWLA":"IN District - Tippecanoe Event","IRI":"Indiana Robotics Invitational","ISTA":"Israel Regional","LAKE":"Bayou Regional","MABOS":"NE District - Boston Event","MANDA":"NE District - UMass-Dartmouth Event","MAREA":"NE District - North Shore Event","MAWOR":"NE District - WPI Event","MDBET":"CHS District - Greater DC Event","MDBLR":"CHS District - Northern Maryland Event","MDEDG":"CHS District - Central Maryland Event","MELEW":"NE District - Pine Tree Event","MIANN":"FIM District - Ann Arbor Skyline Event","MIBRO":"FIM District - Woodhaven Event","MICEN":"FIM District - Center Line Event","MICMP":"Michigan State Championship","MIESC":"FIM District - Escanaba Event","MIHOW":"FIM District - Howell Event","MIKE2":"FIM District - Kettering University Event #2","MIKEN":"FIM District - East Kentwood Event","MIKET":"FIM District - Kettering University Event #1","MILAK":"FIM District - Lakeview Event","MILAN":"FIM District - Lansing Event","MILIV":"FIM District - Livonia Event","MILSU":"FIM District - Lake Superior State University Event","MIMAR":"FIM District - Marysville Event","MIMID":"FIM District - Midland Event","MISJO":"FIM District - St. Joseph Event","MISOU":"FIM District - Southfield Event","MISTA":"FIM District - Standish-Sterling Event","MITRY":"FIM District - Troy Event","MITVC":"FIM District - Traverse City Event","MIWAT":"FIM District - Waterford Event","MIWMI":"FIM District - West Michigan Event","MNDU":"Lake Superior Regional","MNDU2":"Northern Lights Regional","MNMI":"Minnesota 10000 Lakes Regional","MNMI2":"Minnesota North Star Regional","MOKC":"Greater Kansas City Regional","MOSL":"St. Louis Regional","MRCMP":"Mid-Atlantic Robotics District Championship","MXMC":"Mexico City Regional ","NCASH":"NC District - UNC Asheville Event","NCBUI":"NC District - Campbell University/Johnston Community College Event","NCCMP":"NC FIRST Robotics State Championship","NCMCL":"NC District - Guilford County Event","NCRAL":"NC District - Wake County Event","NECMP":"New England District Championship","NEHO":"FIRST Championship - NEHO Division","NEWTON":"FIRST Championship - Newton Subdivision","NHDUR":"NE District - UNH Event","NHGRS":"NE District - Granite State Event","NJBRI":"MAR District - Bridgewater-Raritan Event","NJFLA":"MAR District - Mt. Olive Event","NJSKI":"MAR District - Montgomery Event","NJTAB":"MAR District - Seneca Event","NVLV":"Las Vegas Regional","NYLI":"SBPLI Long Island Regional","NYNY":"New York City Regional","NYRO":"Finger Lakes Regional ","NYTR":"New York Tech Valley Regional","OHCI":"Queen City Regional","OHCL":"Buckeye Regional","OKOK":"Oklahoma Regional ","ONNB":"North Bay Regional","ONTO":"Greater Toronto East Regional ","ONTO2":"Greater Toronto Central Regional","ONWA":"Waterloo Regional ","ONWI":"Windsor Essex Great Lakes Regional","ORORE":"PNW District - Clackamas Academy of Industrial Science Event","ORPHI":"PNW District - Philomath Event","ORWIL":"PNW District - Wilsonville Event","PACA":"Greater Pittsburgh Regional","PAHAT":"MAR District - Hatboro-Horsham Event","PAPHI":"MAR District - Springside Chestnut Hill Event","PAWCH":"MAR District - Westtown Event","PNCMP":"Pacific Northwest District Championship sponsored by Autodesk","QCMO":"FRC Festival de Robotique - Montreal Regional","RIPRO":"NE District - Rhode Island Event","SCMB":"Palmetto Regional","TESLA":"FIRST Championship - Tesla Subdivision","TNKN":"Smoky Mountains Regional","TXDA":"Dallas Regional","TXHO":"Lone Star Regional","TXLU":"Hub City Regional","TXSA":"Alamo Regional sponsored by Rackspace Hosting","UTWV":"Utah Regional","VABLA":"CHS District - Southwest Virginia Event","VADOS":"CHS District - Central Virginia Event","VAHAY":"CHS District - Northern Virginia Event","VAPOR":"CHS District - Hampton Roads Event","WAAHS":"PNW District - Auburn Event","WAAMV":"PNW District - Auburn Mountainview Event","WAELL":"PNW District - Central Washington University Event","WAMOU":"PNW District - Mount Vernon Event","WASNO":"PNW District - Glacier Peak Event","WASPO":"PNW District - West Valley Event","WEEK0":"Week 0","WIMI":"Wisconsin Regional","WVROX":"West Virginia ROX"}';
localStorage.events2017 = '{"ABCA":"Western Canada Regional","ALHU":"Rocket City Regional","ARCHIMEDES":"FIRST Championship - St. Louis - Archimedes Subdivision","ARDA":"FIRST Championship - St. Louis - ARDA Division","ARLI":"Arkansas Rock City Regional","AUSC":"Southern Cross Regional","AUSP":"South Pacific Regional","AZCMP":"Sanghi Foundation FRC AZ State Championship","AZFL":"Arizona North Regional","AZPX":"Arizona West Regional","BC18":"BattleCry 18","CADA":"Sacramento Regional","CAIR":"Orange County Regional","CALB":"Los Angeles Regional","CAMA":"Central Valley Regional","CANE":"FIRST Championship - Houston - CANE Division","CARSON":"FIRST Championship - St. Louis - Carson Subdivision","CARVER":"FIRST Championship - Houston - Carver Subdivision","CASD":"San Diego Regional presented by Qualcomm","CASF":"San Francisco Regional","CASJ":"Silicon Valley Regional","CATE":"FIRST Championship - St. Louis - CATE Division","CAVE":"Ventura Regional","CHCMP":"FIRST Chesapeake District Championship sponsored by Booz Allen Hamilton","CMPMO":"FIRST Championship - St. Louis","CMPTX":"FIRST Championship - Houston","CODE":"Colorado Regional","CTHAR":"NE District - Hartford Event","CTTD":"Cow Town ThrowDown","CTWAT":"NE District - Waterbury Event","CUDA":"FIRST Championship - St. Louis - CUDA Division","CURIE":"FIRST Championship - St. Louis - Curie Subdivision","DALY":"FIRST Championship - St. Louis - Daly Subdivision","DARWIN":"FIRST Championship - St. Louis - Darwin Subdivision","EMCC":"East Metro Collaborative Competition","FLOR":"Orlando Regional","FLWP":"South Florida Regional ","FOC":"Festival of Champions","FOC17":"Festival of Champions","GAALB":"PCH District - Albany Event","GACMP":"Peachtree State Championship","GACOL":"PCH District - Columbus Event","GADAL":"PCH District - Dalton Event","GAGAI":"PCH District - Gainesville Event","GALILEO":"FIRST Championship - Houston - Galileo Subdivision","GARO":"FIRST Championship - Houston - GARO Division","GGGT":"Gitchi Gummi Get-Together","GRITS":"Georgia Robotics Invitational Tournament & Showcase","GUSH":"Shenzhen Regional","HIHO":"Hawaii Regional","HOPPER":"FIRST Championship - Houston - Hopper Subdivision","HOTU":"FIRST Championship - Houston - HOTU Division","IACF":"Iowa Regional","IDBO":"Idaho Regional","ILCH":"Midwest Regional","ILPE":"Central Illinois Regional","INCMP":"Indiana State Championship","INMIS":"IN District - St. Joseph Event","INPMH":"IN District - Perry Meridian Event","INWLA":"IN District - Tippecanoe Event","IRI":"Indiana Robotics Invitational","IROC":"IROC","ISCMP":"FIRST Israel District Championship","ISDE1":"ISR District Event #1","ISDE2":"ISR District Event #2","ISDE3":"ISR District Event #3","ISDE4":"ISR District Event #4","LAKE":"Bayou Regional","MABOS":"NE District - Greater Boston Event","MABRI":"NE District - SE Mass Event","MAREA":"NE District - North Shore Event","MAWOR":"NE District - Worcester Polytechnic Institute Event","MDBET":"CHS District - Greater DC Event sponsored by Accenture","MDBOB":"Battle O’ Baltimore","MDEDG":"CHS District - Central Maryland Event sponsored by Leidos","MDOWI":"CHS District - Northern Maryland Event","MELEW":"NE District - Pine Tree Event","MEMS":"Mainely SPIRIT 7","MESH":"Summer Heat","MIANN":"FIM District - Ann Arbor Pioneer Event","MIBRO":"FIM District - Woodhaven Event","MICEN":"FIM District - Center Line Event","MICMP":"Michigan State Championship","MICMP1":"Michigan State Championship - Consumers Energy Division","MICMP2":"Michigan State Championship - Dow Division","MICMP3":"Michigan State Championship - DTE Energy Foundation Division","MICMP4":"Michigan State Championship - Ford Division","MIESC":"FIM District - Escanaba Event","MIGAY":"FIM District - Gaylord Event","MIGUL":"FIM District - Gull Lake Event","MIHOW":"FIM District - Howell Event","MIKE2":"FIM District - Kettering University Event #2","MIKEN":"FIM District - East Kentwood Event","MIKET":"FIM District - Kettering University Event #1","MILAK":"FIM District - Lakeview Event","MILAN":"FIM District - Lansing Event","MILIV":"FIM District - Livonia Event","MILSU":"FIM District - Lake Superior State University Event","MIMAR":"FIM District - Marysville Event","MIMID":"FIM District - Midland Event","MISHE":"FIM District - Shepherd Event","MISJO":"FIM District - St. Joseph Event","MISOU":"FIM District - Southfield Event","MITRY":"FIM District - Troy Event","MITVC":"FIM District - Traverse City Event","MIWAT":"FIM District - Waterford Event","MIWMI":"FIM District - West Michigan Event","MNCL":"Northern Minnesota Robotics Conference Tournament","MNCMP":"MSHSL FIRST State Robotics Championship","MNDU":"Lake Superior Regional","MNDU2":"Northern Lights Regional","MNMI":"Minnesota 10000 Lakes Regional","MNMI2":"Minnesota North Star Regional","MNRI":"Minnesota Robotics Invitational","MOKC":"Greater Kansas City Regional","MOSL":"St. Louis Regional","MRCMP":"FIRST Mid-Atlantic District Championship sponsored by Johnson & Johnson","MXTL":"Toluca Regional","MXTO":"Laguna Regional","NCASH":"NC District - UNC Asheville Event","NCCMP":"FIRST North Carolina State Championship","NCGRE":"NC District - Greensboro Event","NCRAL":"NC District - Raleigh Event","NCWIN":"NC District - Pitt County Event","NECMP":"New England District Championship","NEWTON":"FIRST Championship - Houston - Newton Subdivision","NHBED":"NE District - Southern NH Event","NHBOB":"Battle Of the Bay","NHGRS":"NE District - Granite State Event","NHRR":"RiverRage 21","NJBE":"Brunswick Eruption","NJBRI":"MAR District - Bridgewater-Raritan Event","NJFLA":"MAR District - Mount Olive Event","NJSKI":"MAR District - Montgomery Event","NJTAB":"MAR District - Seneca Event","NTTR":"North Texas Tournament of Robots","NVLV":"Las Vegas Regional","NYLI":"SBPLI Long Island Regional","NYNY":"New York City Regional","NYRO":"Finger Lakes Regional ","NYSU":"Hudson Valley Regional","NYTR":"New York Tech Valley Regional","OHCL":"Buckeye Regional","OHSP":"Miami Valley Regional","OKOK":"Oklahoma Regional ","ONBAR":"ONT District - Georgian College Event","ONCMP":"FIRST Ontario Provincial Championship","ONHA2":"STEMley Cup","ONHAM":"ONT District - McMaster University Event","ONLON":"ONT District - Western University, Engineering Event","ONNOB":"ONT District - North Bay Event","ONOSH":"ONT District - Durham College Event","ONTO1":"ONT District - Ryerson University Event","ONTO2":"ONT District - Victoria Park Collegiate Event","ONWAT":"ONT District - University of Waterloo Event","ONWIN":"ONT District - Windsor Essex Great Lakes Event","ORLAK":"PNW District - Lake Oswego Event","ORORE":"PNW District - Clackamas Academy of Industrial Science Event","ORWIL":"PNW District - Wilsonville Event","PACA":"Greater Pittsburgh Regional","PAHAT":"MAR District - Hatboro-Horsham Event","PAPHI":"MAR District - Springside Chestnut Hill Academy Event","PAWCH":"MAR District - Westtown Event","PNCMP":"Pacific Northwest District Championship","QCMO":"Festival de Robotique - Montreal Regional","R2OC":"Rock River Off-Season Competition","RIPRO":"NE District - Rhode Island Event","ROEBLING":"FIRST Championship - Houston - Roebling Subdivision","SCMB":"Palmetto Regional","TESLA":"FIRST Championship - St. Louis - Tesla Subdivision","TNKN":"Smoky Mountains Regional","TURING":"FIRST Championship - Houston - Turing Subdivision","TXDA":"Dallas Regional","TXHO":"Lone Star Central Regional","TXLU":"Hub City Regional","TXRI":"Texas Robotics Invitational","TXRR":"Texas Robot Roundup","TXSA":"Alamo Regional","TXTR":"The Remix","TXWA":"Brazos Valley Regional","TXWO":"Lone Star North Regional","UTWV":"Utah Regional","VABLA":"CHS District - Southwest Virginia Event","VAGLE":"CHS District - Central Virginia Event","VAHAY":"CHS District - Northern Virginia Event sponsored by Bechtel","VAPOR":"CHS District - Hampton Roads Event sponsored by Newport News Shipbuilding","WAAHS":"PNW District - Auburn Event","WAAMV":"PNW District - Auburn Mountainview Event","WAELL":"PNW District - Central Washington University Event","WAGG":"Washington Girls Generation","WAMOU":"PNW District - Mount Vernon Event","WAPP":"Peak Performance","WASNO":"PNW District - Glacier Peak Event","WASPO":"PNW District - West Valley Event","WEEK0":"Week 0","WILA":"Seven Rivers Regional","WIMI":"Wisconsin Regional"}';
var events2016Data = JSON.parse(`{"Events":[{"code":"ABCA","divisionCode":null,"name":"Western Canada Regional","type":"Regional","districtCode":null,"venue":"The Olympic Oval","address":null,"city":"Calgary","stateprov":"AB","country":"Canada","website":null,"webcasts":[],"timezone":"Mountain Standard Time","dateStart":"2016-04-03T00:00:00","dateEnd":"2016-04-06T23:59:59"},{"code":"ALHU","divisionCode":null,"name":"Rocket City Regional","type":"Regional","districtCode":null,"venue":"Von Braun Center","address":null,"city":"Huntsville","stateprov":"AL","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2016-03-23T00:00:00","dateEnd":"2016-03-26T23:59:59"},{"code":"ARCHIMEDES","divisionCode":"ARTE","name":"FIRST Championship - Archimedes Subdivision","type":"ChampionshipSubdivision","districtCode":null,"venue":"The Dome at America's Center","address":null,"city":"St. Louis","stateprov":"MO","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2016-04-27T00:00:00","dateEnd":"2016-04-30T23:59:59"},{"code":"ARLR","divisionCode":null,"name":"Arkansas Rock City Regional","type":"Regional","districtCode":null,"venue":"Arkansas State Fairgrounds - Barton Coliseum","address":null,"city":"Little Rock","stateprov":"AR","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2016-03-09T00:00:00","dateEnd":"2016-03-12T23:59:59"},{"code":"ARTE","divisionCode":"CMP","name":"FIRST Championship - ARTE Division","type":"ChampionshipDivision","districtCode":null,"venue":"The Dome at America's Center","address":null,"city":"St. Louis","stateprov":"MO","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2016-04-27T00:00:00","dateEnd":"2016-04-30T23:59:59"},{"code":"AUSY","divisionCode":null,"name":"Australia Regional","type":"Regional","districtCode":null,"venue":"Sydney Olympic Park Sports Centre","address":null,"city":"Sydney Olympic Park","stateprov":"NSW","country":"Australia","website":null,"webcasts":[],"timezone":"E. Australia Standard Time","dateStart":"2016-03-16T00:00:00","dateEnd":"2016-03-19T23:59:59"},{"code":"AZFL","divisionCode":null,"name":"Arizona North Regional","type":"Regional","districtCode":null,"venue":"Walkup Skydome - Northern Arizona University","address":null,"city":"Flagstaff","stateprov":"AZ","country":"USA","website":null,"webcasts":[],"timezone":"US Mountain Standard Time","dateStart":"2016-03-09T00:00:00","dateEnd":"2016-03-12T23:59:59"},{"code":"AZPX","divisionCode":null,"name":"Arizona West Regional","type":"Regional","districtCode":null,"venue":"Grand Canyon University Arena","address":null,"city":"Phoenix","stateprov":"AZ","country":"USA","website":null,"webcasts":[],"timezone":"US Mountain Standard Time","dateStart":"2016-04-06T00:00:00","dateEnd":"2016-04-09T23:59:59"},{"code":"CADA","divisionCode":null,"name":"Sacramento Regional","type":"Regional","districtCode":null,"venue":"UC Davis ARC Pavilion","address":null,"city":"Davis","stateprov":"CA","country":"USA","website":null,"webcasts":[],"timezone":"Pacific Standard Time","dateStart":"2016-03-23T00:00:00","dateEnd":"2016-03-26T23:59:59"},{"code":"CALB","divisionCode":null,"name":"Los Angeles Regional","type":"Regional","districtCode":null,"venue":"Long Beach Convention and Entertainment Center","address":null,"city":"Long Beach","stateprov":"CA","country":"USA","website":null,"webcasts":[],"timezone":"Pacific Standard Time","dateStart":"2016-03-09T00:00:00","dateEnd":"2016-03-12T23:59:59"},{"code":"CAMA","divisionCode":null,"name":"Central Valley Regional","type":"Regional","districtCode":null,"venue":"Madera South High School","address":null,"city":"Madera","stateprov":"CA","country":"USA","website":null,"webcasts":[],"timezone":"Pacific Standard Time","dateStart":"2016-03-10T00:00:00","dateEnd":"2016-03-13T23:59:59"},{"code":"CAPL","divisionCode":null,"name":"Orange County Regional","type":"Regional","districtCode":null,"venue":"Valencia High School","address":null,"city":"Placentia","stateprov":"CA","country":"USA","website":null,"webcasts":[],"timezone":"Pacific Standard Time","dateStart":"2016-03-30T00:00:00","dateEnd":"2016-04-02T23:59:59"},{"code":"CARSON","divisionCode":"GACA","name":"FIRST Championship - Carson Subdivision","type":"ChampionshipSubdivision","districtCode":null,"venue":"The Dome at America's Center","address":null,"city":"St. Louis","stateprov":"MO","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2016-04-27T00:00:00","dateEnd":"2016-04-30T23:59:59"},{"code":"CARVER","divisionCode":"CUCA","name":"FIRST Championship - Carver Subdivision","type":"ChampionshipSubdivision","districtCode":null,"venue":"The Dome at America's Center","address":null,"city":"St. Louis","stateprov":"MO","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2016-04-27T00:00:00","dateEnd":"2016-04-30T23:59:59"},{"code":"CASD","divisionCode":null,"name":"San Diego Regional","type":"Regional","districtCode":null,"venue":"Del Mar Fairgrounds Arena Complex","address":null,"city":"Del Mar","stateprov":"CA","country":"USA","website":null,"webcasts":[],"timezone":"Pacific Standard Time","dateStart":"2016-03-02T00:00:00","dateEnd":"2016-03-05T23:59:59"},{"code":"CASJ","divisionCode":null,"name":"Silicon Valley Regional presented by Google.org","type":"Regional","districtCode":null,"venue":"San Jose State University - The Event Center","address":null,"city":"San Jose","stateprov":"CA","country":"USA","website":null,"webcasts":[],"timezone":"Pacific Standard Time","dateStart":"2016-04-06T00:00:00","dateEnd":"2016-04-09T23:59:59"},{"code":"CAVE","divisionCode":null,"name":"Ventura Regional","type":"Regional","districtCode":null,"venue":"Ventura College","address":null,"city":"Ventura","stateprov":"CA","country":"USA","website":null,"webcasts":[],"timezone":"Pacific Standard Time","dateStart":"2016-03-23T00:00:00","dateEnd":"2016-03-26T23:59:59"},{"code":"CHCMP","divisionCode":null,"name":"FIRST Chesapeake District Championship sponsored by Booz Allen Hamilton","type":"DistrictChampionship","districtCode":"CHS","venue":"XFINITY Center - University of Maryland","address":null,"city":"College Park","stateprov":"MD","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-04-06T00:00:00","dateEnd":"2016-04-09T23:59:59"},{"code":"CMP","divisionCode":null,"name":"FIRST Championship","type":"Championship","districtCode":null,"venue":"The Dome at America's Center","address":null,"city":"St. Louis","stateprov":"MO","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2016-04-27T00:00:00","dateEnd":"2016-04-30T23:59:59"},{"code":"CODE","divisionCode":null,"name":"Colorado Regional","type":"Regional","districtCode":null,"venue":"University of Denver - Daniel L. Ritchie Center","address":null,"city":"Denver","stateprov":"CO","country":"USA","website":null,"webcasts":[],"timezone":"Mountain Standard Time","dateStart":"2016-03-23T00:00:00","dateEnd":"2016-03-26T23:59:59"},{"code":"CTHAR","divisionCode":null,"name":"NE District - Hartford Event","type":"DistrictEvent","districtCode":"NE","venue":"Hartford Public High School","address":null,"city":"Hartford","stateprov":"CT","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-04-01T00:00:00","dateEnd":"2016-04-03T23:59:59"},{"code":"CTWAT","divisionCode":null,"name":"NE District - Waterbury Event","type":"DistrictEvent","districtCode":"NE","venue":"Wilby High School","address":null,"city":"Waterbury","stateprov":"CT","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-04T00:00:00","dateEnd":"2016-03-06T23:59:59"},{"code":"CUCA","divisionCode":"CMP","name":"FIRST Championship - CUCA Division","type":"ChampionshipDivision","districtCode":null,"venue":"The Dome at America's Center","address":null,"city":"St. Louis","stateprov":"MO","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2016-04-27T00:00:00","dateEnd":"2016-04-30T23:59:59"},{"code":"CURIE","divisionCode":"CUCA","name":"FIRST Championship - Curie Subdivision","type":"ChampionshipSubdivision","districtCode":null,"venue":"The Dome at America's Center","address":null,"city":"St. Louis","stateprov":"MO","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2016-04-27T00:00:00","dateEnd":"2016-04-30T23:59:59"},{"code":"FLOR","divisionCode":null,"name":"Orlando Regional","type":"Regional","districtCode":null,"venue":"CFE Arena at the University of Central Florida","address":null,"city":"Orlando","stateprov":"FL","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-09T00:00:00","dateEnd":"2016-03-12T23:59:59"},{"code":"FLWP","divisionCode":null,"name":"South Florida Regional ","type":"Regional","districtCode":null,"venue":"Palm Beach Convention Center","address":null,"city":"West Palm Beach","stateprov":"FL","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-30T00:00:00","dateEnd":"2016-04-02T23:59:59"},{"code":"GAALB","divisionCode":null,"name":"PCH District - Albany Event","type":"DistrictEvent","districtCode":"PCH","venue":"Albany Civic Center","address":null,"city":"Albany","stateprov":"GA","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-17T00:00:00","dateEnd":"2016-03-19T23:59:59"},{"code":"GACA","divisionCode":"CMP","name":"FIRST Championship - GACA Division","type":"ChampionshipDivision","districtCode":null,"venue":"The Dome at America's Center","address":null,"city":"St. Louis","stateprov":"MO","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2016-04-27T00:00:00","dateEnd":"2016-04-30T23:59:59"},{"code":"GACMP","divisionCode":null,"name":"Peachtree District State Championship","type":"DistrictChampionship","districtCode":"PCH","venue":"University of Georgia - Stegeman Coliseum","address":null,"city":"Athens","stateprov":"GA","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-04-13T00:00:00","dateEnd":"2016-04-16T23:59:59"},{"code":"GACOL","divisionCode":null,"name":"PCH District - Columbus Event","type":"DistrictEvent","districtCode":"PCH","venue":"Columbus Civic Center","address":null,"city":"Columbus","stateprov":"GA","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-10T00:00:00","dateEnd":"2016-03-12T23:59:59"},{"code":"GADAL","divisionCode":null,"name":"PCH District - Dalton Event","type":"DistrictEvent","districtCode":"PCH","venue":"Dalton Convention Center","address":null,"city":"Dalton","stateprov":"GA","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-17T00:00:00","dateEnd":"2016-03-19T23:59:59"},{"code":"GAKEN","divisionCode":null,"name":"PCH District - Kennesaw Event","type":"DistrictEvent","districtCode":"PCH","venue":"Kennesaw State University - Convocation Center","address":null,"city":"Kennesaw","stateprov":"GA","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-04-08T00:00:00","dateEnd":"2016-04-10T23:59:59"},{"code":"GALILEO","divisionCode":"GACA","name":"FIRST Championship - Galileo Subdivision","type":"ChampionshipSubdivision","districtCode":null,"venue":"The Dome at America's Center","address":null,"city":"St. Louis","stateprov":"MO","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2016-04-27T00:00:00","dateEnd":"2016-04-30T23:59:59"},{"code":"HEAT","divisionCode":null,"name":"Summer Heat","type":"OffSeasonWithAzureSync","districtCode":null,"venue":"South Portland High School","address":null,"city":"South Portland","stateprov":"ME","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-07-16T00:00:00","dateEnd":"2016-07-16T23:59:59"},{"code":"HIHO","divisionCode":null,"name":"Hawaii Regional","type":"Regional","districtCode":null,"venue":"University of Hawaii at Manoa","address":null,"city":"Honolulu","stateprov":"HI","country":"USA","website":null,"webcasts":[],"timezone":"Hawaiian Standard Time","dateStart":"2016-03-30T00:00:00","dateEnd":"2016-04-02T23:59:59"},{"code":"HOPPER","divisionCode":"NEHO","name":"FIRST Championship - Hopper Subdivision","type":"ChampionshipSubdivision","districtCode":null,"venue":"The Dome at America's Center","address":null,"city":"St. Louis","stateprov":"MO","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2016-04-27T00:00:00","dateEnd":"2016-04-30T23:59:59"},{"code":"IACF","divisionCode":null,"name":"Iowa Regional","type":"Regional","districtCode":null,"venue":"McLeod Center/UNI Dome","address":null,"city":"Cedar Falls","stateprov":"IA","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2016-03-23T00:00:00","dateEnd":"2016-03-26T23:59:59"},{"code":"IDBO","divisionCode":null,"name":"Idaho Regional","type":"Regional","districtCode":null,"venue":"Boise State University at Taco Bell Arena","address":null,"city":"Boise","stateprov":"ID","country":"USA","website":null,"webcasts":[],"timezone":"Mountain Standard Time","dateStart":"2016-03-30T00:00:00","dateEnd":"2016-04-02T23:59:59"},{"code":"ILCH","divisionCode":null,"name":"Midwest Regional","type":"Regional","districtCode":null,"venue":"UIC Pavilion ","address":null,"city":"Chicago","stateprov":"IL","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2016-03-30T00:00:00","dateEnd":"2016-04-02T23:59:59"},{"code":"ILPE","divisionCode":null,"name":"Central Illinois Regional","type":"Regional","districtCode":null,"venue":"Renaissance Coliseum - Bradley University","address":null,"city":"Peoria","stateprov":"IL","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2016-03-16T00:00:00","dateEnd":"2016-03-19T23:59:59"},{"code":"INCMP","divisionCode":null,"name":"Indiana State Championship","type":"DistrictChampionship","districtCode":"IN","venue":"Kokomo Memorial Gym","address":null,"city":"Kokomo","stateprov":"IN","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-04-14T00:00:00","dateEnd":"2016-04-16T23:59:59"},{"code":"INPMH","divisionCode":null,"name":"IN District - Perry Meridian Event","type":"DistrictEvent","districtCode":"IN","venue":"Perry Meridian High School","address":null,"city":"Indianapolis","stateprov":"IN","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-24T00:00:00","dateEnd":"2016-03-26T23:59:59"},{"code":"INWCH","divisionCode":null,"name":"IN District - Walker Warren Event","type":"DistrictEvent","districtCode":"IN","venue":"Warren Central High School","address":null,"city":"Indianapolis","stateprov":"IN","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-18T00:00:00","dateEnd":"2016-03-20T23:59:59"},{"code":"INWLA","divisionCode":null,"name":"IN District - Tippecanoe Event","type":"DistrictEvent","districtCode":"IN","venue":"William Henry Harrison High School","address":null,"city":"West Lafayette","stateprov":"IN","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-11T00:00:00","dateEnd":"2016-03-13T23:59:59"},{"code":"IRI","divisionCode":null,"name":"Indiana Robotics Invitational","type":"OffSeasonWithAzureSync","districtCode":null,"venue":"Lawrence Central High School","address":null,"city":"Indianapolis","stateprov":"IN","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-07-15T00:00:00","dateEnd":"2016-07-16T23:59:59"},{"code":"ISTA","divisionCode":null,"name":"Israel Regional","type":"Regional","districtCode":null,"venue":"Menora Mivtachim Arena","address":null,"city":"Tel Aviv","stateprov":"TA","country":"Israel","website":null,"webcasts":[],"timezone":"Israel Standard Time","dateStart":"2016-03-08T00:00:00","dateEnd":"2016-03-10T23:59:59"},{"code":"LAKE","divisionCode":null,"name":"Bayou Regional","type":"Regional","districtCode":null,"venue":"Pontchartrain Center","address":null,"city":"Kenner","stateprov":"LA","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2016-03-16T00:00:00","dateEnd":"2016-03-19T23:59:59"},{"code":"MABOS","divisionCode":null,"name":"NE District - Boston Event","type":"DistrictEvent","districtCode":"NE","venue":"Agganis Arena - Boston University","address":null,"city":"Boston","stateprov":"MA","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-04-01T00:00:00","dateEnd":"2016-04-03T23:59:59"},{"code":"MANDA","divisionCode":null,"name":"NE District - UMass-Dartmouth Event","type":"DistrictEvent","districtCode":"NE","venue":"Tripp Athletic Center","address":null,"city":"North Dartmouth","stateprov":"MA","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-18T00:00:00","dateEnd":"2016-03-20T23:59:59"},{"code":"MAREA","divisionCode":null,"name":"NE District - North Shore Event","type":"DistrictEvent","districtCode":"NE","venue":"Reading High School","address":null,"city":"Reading","stateprov":"MA","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-11T00:00:00","dateEnd":"2016-03-13T23:59:59"},{"code":"MAWOR","divisionCode":null,"name":"NE District - WPI Event","type":"DistrictEvent","districtCode":"NE","venue":"WPI - Harrington Auditorium ","address":null,"city":"Worcester","stateprov":"MA","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-11T00:00:00","dateEnd":"2016-03-13T23:59:59"},{"code":"MDBET","divisionCode":null,"name":"CHS District - Greater DC Event","type":"DistrictEvent","districtCode":"CHS","venue":"Walt Whitman High School","address":null,"city":"Bethesda","stateprov":"MD","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-11T00:00:00","dateEnd":"2016-03-13T23:59:59"},{"code":"MDBLR","divisionCode":null,"name":"CHS District - Northern Maryland Event","type":"DistrictEvent","districtCode":"CHS","venue":"Harford Technical High School","address":null,"city":"Bel Air","stateprov":"MD","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-18T00:00:00","dateEnd":"2016-03-20T23:59:59"},{"code":"MDEDG","divisionCode":null,"name":"CHS District - Central Maryland Event","type":"DistrictEvent","districtCode":"CHS","venue":"South River High School","address":null,"city":"Edgewater","stateprov":"MD","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-24T00:00:00","dateEnd":"2016-03-26T23:59:59"},{"code":"MELEW","divisionCode":null,"name":"NE District - Pine Tree Event","type":"DistrictEvent","districtCode":"NE","venue":"Androscoggin Bank Colisee","address":null,"city":"Lewiston","stateprov":"ME","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-04-07T00:00:00","dateEnd":"2016-04-09T23:59:59"},{"code":"MIANN","divisionCode":null,"name":"FIM District - Ann Arbor Skyline Event","type":"DistrictEvent","districtCode":"FIM","venue":"Skyline High School","address":null,"city":"Ann Arbor","stateprov":"MI","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-04-07T00:00:00","dateEnd":"2016-04-09T23:59:59"},{"code":"MIBRO","divisionCode":null,"name":"FIM District - Woodhaven Event","type":"DistrictEvent","districtCode":"FIM","venue":"Woodhaven High School","address":null,"city":"Brownstown","stateprov":"MI","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-04-07T00:00:00","dateEnd":"2016-04-09T23:59:59"},{"code":"MICEN","divisionCode":null,"name":"FIM District - Center Line Event","type":"DistrictEvent","districtCode":"FIM","venue":"Center Line High School","address":null,"city":"Center Line","stateprov":"MI","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-17T00:00:00","dateEnd":"2016-03-19T23:59:59"},{"code":"MICMP","divisionCode":null,"name":"Michigan State Championship","type":"DistrictChampionship","districtCode":"FIM","venue":"DeltaPlex Arena","address":null,"city":"Grand Rapids","stateprov":"MI","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-04-13T00:00:00","dateEnd":"2016-04-16T23:59:59"},{"code":"MIESC","divisionCode":null,"name":"FIM District - Escanaba Event","type":"DistrictEvent","districtCode":"FIM","venue":"Escanaba High School","address":null,"city":"Escanaba","stateprov":"MI","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-17T00:00:00","dateEnd":"2016-03-19T23:59:59"},{"code":"MIHOW","divisionCode":null,"name":"FIM District - Howell Event","type":"DistrictEvent","districtCode":"FIM","venue":"Parker Middle School","address":null,"city":"Howell","stateprov":"MI","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-31T00:00:00","dateEnd":"2016-04-02T23:59:59"},{"code":"MIKE2","divisionCode":null,"name":"FIM District - Kettering University Event #2","type":"DistrictEvent","districtCode":"FIM","venue":"Kettering University","address":null,"city":"Flint","stateprov":"MI","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-10T00:00:00","dateEnd":"2016-03-12T23:59:59"},{"code":"MIKEN","divisionCode":null,"name":"FIM District - East Kentwood Event","type":"DistrictEvent","districtCode":"FIM","venue":"East Kentwood High School","address":null,"city":"Kentwood","stateprov":"MI","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-31T00:00:00","dateEnd":"2016-04-02T23:59:59"},{"code":"MIKET","divisionCode":null,"name":"FIM District - Kettering University Event #1","type":"DistrictEvent","districtCode":"FIM","venue":"Kettering University","address":null,"city":"Flint","stateprov":"MI","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-03T00:00:00","dateEnd":"2016-03-05T23:59:59"},{"code":"MILAK","divisionCode":null,"name":"FIM District - Lakeview Event","type":"DistrictEvent","districtCode":"FIM","venue":"Lakeview High School","address":null,"city":"Battle Creek","stateprov":"MI","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-10T00:00:00","dateEnd":"2016-03-12T23:59:59"},{"code":"MILAN","divisionCode":null,"name":"FIM District - Lansing Event","type":"DistrictEvent","districtCode":"FIM","venue":"Mason High School","address":null,"city":"Mason","stateprov":"MI","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-24T00:00:00","dateEnd":"2016-03-26T23:59:59"},{"code":"MILIV","divisionCode":null,"name":"FIM District - Livonia Event","type":"DistrictEvent","districtCode":"FIM","venue":"Churchill High School","address":null,"city":"Livonia","stateprov":"MI","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-24T00:00:00","dateEnd":"2016-03-26T23:59:59"},{"code":"MILSU","divisionCode":null,"name":"FIM District - Lake Superior State University Event","type":"DistrictEvent","districtCode":"FIM","venue":"Lake Superior State University","address":null,"city":"Sault Ste. Marie","stateprov":"MI","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-31T00:00:00","dateEnd":"2016-04-02T23:59:59"},{"code":"MIMAR","divisionCode":null,"name":"FIM District - Marysville Event","type":"DistrictEvent","districtCode":"FIM","venue":"Marysville High School","address":null,"city":"Marysville","stateprov":"MI","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-24T00:00:00","dateEnd":"2016-03-26T23:59:59"},{"code":"MIMID","divisionCode":null,"name":"FIM District - Midland Event","type":"DistrictEvent","districtCode":"FIM","venue":"H.H. Dow High School","address":null,"city":"Midland","stateprov":"MI","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-17T00:00:00","dateEnd":"2016-03-19T23:59:59"},{"code":"MISJO","divisionCode":null,"name":"FIM District - St. Joseph Event","type":"DistrictEvent","districtCode":"FIM","venue":"St. Joseph High School","address":null,"city":"St. Joseph","stateprov":"MI","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-10T00:00:00","dateEnd":"2016-03-12T23:59:59"},{"code":"MISOU","divisionCode":null,"name":"FIM District - Southfield Event","type":"DistrictEvent","districtCode":"FIM","venue":"Southfield High School","address":null,"city":"Southfield","stateprov":"MI","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-03T00:00:00","dateEnd":"2016-03-05T23:59:59"},{"code":"MISTA","divisionCode":null,"name":"FIM District - Standish-Sterling Event","type":"DistrictEvent","districtCode":"FIM","venue":"Standish-Sterling Central High School","address":null,"city":"Standish","stateprov":"MI","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-03T00:00:00","dateEnd":"2016-03-05T23:59:59"},{"code":"MITRY","divisionCode":null,"name":"FIM District - Troy Event","type":"DistrictEvent","districtCode":"FIM","venue":"Troy Athens High School","address":null,"city":"Troy","stateprov":"MI","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-31T00:00:00","dateEnd":"2016-04-02T23:59:59"},{"code":"MITVC","divisionCode":null,"name":"FIM District - Traverse City Event","type":"DistrictEvent","districtCode":"FIM","venue":"Traverse City Central High School","address":null,"city":"Traverse City","stateprov":"MI","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-04-07T00:00:00","dateEnd":"2016-04-09T23:59:59"},{"code":"MIWAT","divisionCode":null,"name":"FIM District - Waterford Event","type":"DistrictEvent","districtCode":"FIM","venue":"Waterford Mott High School","address":null,"city":"Waterford","stateprov":"MI","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-03T00:00:00","dateEnd":"2016-03-05T23:59:59"},{"code":"MIWMI","divisionCode":null,"name":"FIM District - West Michigan Event","type":"DistrictEvent","districtCode":"FIM","venue":"Grand Valley State University","address":null,"city":"Allendale","stateprov":"MI","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-24T00:00:00","dateEnd":"2016-03-26T23:59:59"},{"code":"MNDU","divisionCode":null,"name":"Lake Superior Regional","type":"Regional","districtCode":null,"venue":"DECC Arena/South Pioneer Hall","address":null,"city":"Duluth","stateprov":"MN","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2016-03-02T00:00:00","dateEnd":"2016-03-05T23:59:59"},{"code":"MNDU2","divisionCode":null,"name":"Northern Lights Regional","type":"Regional","districtCode":null,"venue":"DECC Arena/Edmund Fitzgerald Exhibit Hall","address":null,"city":"Duluth","stateprov":"MN","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2016-03-02T00:00:00","dateEnd":"2016-03-05T23:59:59"},{"code":"MNMI","divisionCode":null,"name":"Minnesota 10000 Lakes Regional","type":"Regional","districtCode":null,"venue":"Williams Arena/The Sports Pavilion Univ of MN","address":null,"city":"Minneapolis","stateprov":"MN","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2016-04-06T00:00:00","dateEnd":"2016-04-09T23:59:59"},{"code":"MNMI2","divisionCode":null,"name":"Minnesota North Star Regional","type":"Regional","districtCode":null,"venue":"Mariucci Arena - University of Minnesota","address":null,"city":"Minneapolis","stateprov":"MN","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2016-04-06T00:00:00","dateEnd":"2016-04-09T23:59:59"},{"code":"MOKC","divisionCode":null,"name":"Greater Kansas City Regional","type":"Regional","districtCode":null,"venue":"Metropolitan Community College/Bus. & Tech. Campus","address":null,"city":"Kansas City","stateprov":"MO","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2016-03-09T00:00:00","dateEnd":"2016-03-12T23:59:59"},{"code":"MOSL","divisionCode":null,"name":"St. Louis Regional","type":"Regional","districtCode":null,"venue":"Chaifetz Arena","address":null,"city":"St. Louis","stateprov":"MO","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2016-03-09T00:00:00","dateEnd":"2016-03-12T23:59:59"},{"code":"MRCMP","divisionCode":null,"name":"Mid-Atlantic Robotics District Championship","type":"DistrictChampionship","districtCode":"MAR","venue":"Stabler Arena, Lehigh University","address":null,"city":"Bethlehem","stateprov":"PA","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-04-13T00:00:00","dateEnd":"2016-04-16T23:59:59"},{"code":"MXMC","divisionCode":null,"name":"Mexico City Regional ","type":"Regional","districtCode":null,"venue":"Arena Ciudad de Mexico","address":null,"city":"Mexico City","stateprov":"DIF","country":"Mexico","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2016-03-09T00:00:00","dateEnd":"2016-03-12T23:59:59"},{"code":"NCASH","divisionCode":null,"name":"NC District - UNC Asheville Event","type":"DistrictEvent","districtCode":"NC","venue":"UNC Asheville Sherrill Center Kimmel Arena","address":null,"city":"Asheville","stateprov":"NC","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-18T00:00:00","dateEnd":"2016-03-20T23:59:59"},{"code":"NCBUI","divisionCode":null,"name":"NC District - Campbell University/Johnston Community College Event","type":"DistrictEvent","districtCode":"NC","venue":"Campbell University John W. Pope, Jr. Convocation Center","address":null,"city":"Buies Creek","stateprov":"NC","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-04-01T00:00:00","dateEnd":"2016-04-03T23:59:59"},{"code":"NCCMP","divisionCode":null,"name":"NC FIRST Robotics State Championship","type":"DistrictChampionship","districtCode":"NC","venue":"UNC Charlotte Halton Arena","address":null,"city":"Charlotte","stateprov":"NC","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-04-08T00:00:00","dateEnd":"2016-04-10T23:59:59"},{"code":"NCMCL","divisionCode":null,"name":"NC District - Guilford County Event","type":"DistrictEvent","districtCode":"NC","venue":"Northeast Guilford High School","address":null,"city":"McLeansville","stateprov":"NC","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-04T00:00:00","dateEnd":"2016-03-06T23:59:59"},{"code":"NCRAL","divisionCode":null,"name":"NC District - Wake County Event","type":"DistrictEvent","districtCode":"NC","venue":"Southeast Raleigh Magnet High School","address":null,"city":"Raleigh","stateprov":"NC","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-11T00:00:00","dateEnd":"2016-03-13T23:59:59"},{"code":"NECMP","divisionCode":null,"name":"New England District Championship","type":"DistrictChampionship","districtCode":"NE","venue":"XL Center","address":null,"city":"Hartford","stateprov":"CT","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-04-13T00:00:00","dateEnd":"2016-04-16T23:59:59"},{"code":"NEHO","divisionCode":"CMP","name":"FIRST Championship - NEHO Division","type":"ChampionshipDivision","districtCode":null,"venue":"The Dome at America's Center","address":null,"city":"St. Louis","stateprov":"MO","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2016-04-27T00:00:00","dateEnd":"2016-04-30T23:59:59"},{"code":"NEWTON","divisionCode":"NEHO","name":"FIRST Championship - Newton Subdivision","type":"ChampionshipSubdivision","districtCode":null,"venue":"The Dome at America's Center","address":null,"city":"St. Louis","stateprov":"MO","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2016-04-27T00:00:00","dateEnd":"2016-04-30T23:59:59"},{"code":"NHDUR","divisionCode":null,"name":"NE District - UNH Event","type":"DistrictEvent","districtCode":"NE","venue":"University of New Hampshire","address":null,"city":"Durham","stateprov":"NH","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-24T00:00:00","dateEnd":"2016-03-26T23:59:59"},{"code":"NHGRS","divisionCode":null,"name":"NE District - Granite State Event","type":"DistrictEvent","districtCode":"NE","venue":"Windham High School","address":null,"city":"Windham","stateprov":"NH","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-04T00:00:00","dateEnd":"2016-03-06T23:59:59"},{"code":"NJBRI","divisionCode":null,"name":"MAR District - Bridgewater-Raritan Event","type":"DistrictEvent","districtCode":"MAR","venue":"Bridgewater-Raritan High School","address":null,"city":"Bridgewater","stateprov":"NJ","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-04-01T00:00:00","dateEnd":"2016-04-03T23:59:59"},{"code":"NJFLA","divisionCode":null,"name":"MAR District - Mt. Olive Event","type":"DistrictEvent","districtCode":"MAR","venue":"Mt. Olive High School","address":null,"city":"Flanders","stateprov":"NJ","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-04T00:00:00","dateEnd":"2016-03-06T23:59:59"},{"code":"NJSKI","divisionCode":null,"name":"MAR District - Montgomery Event","type":"DistrictEvent","districtCode":"MAR","venue":"Montgomery Township High School","address":null,"city":"Skillman","stateprov":"NJ","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-04-08T00:00:00","dateEnd":"2016-04-10T23:59:59"},{"code":"NJTAB","divisionCode":null,"name":"MAR District - Seneca Event","type":"DistrictEvent","districtCode":"MAR","venue":"Seneca High School","address":null,"city":"Tabernacle","stateprov":"NJ","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-18T00:00:00","dateEnd":"2016-03-20T23:59:59"},{"code":"NVLV","divisionCode":null,"name":"Las Vegas Regional","type":"Regional","districtCode":null,"venue":"Las Vegas Convention Center - South Hall","address":null,"city":"Las Vegas","stateprov":"NV","country":"USA","website":null,"webcasts":[],"timezone":"Pacific Standard Time","dateStart":"2016-03-30T00:00:00","dateEnd":"2016-04-02T23:59:59"},{"code":"NYLI","divisionCode":null,"name":"SBPLI Long Island Regional","type":"Regional","districtCode":null,"venue":"Hofstra University","address":null,"city":"Hempstead","stateprov":"NY","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-30T00:00:00","dateEnd":"2016-04-02T23:59:59"},{"code":"NYNY","divisionCode":null,"name":"New York City Regional","type":"Regional","districtCode":null,"venue":"Jacob K. Javits Convention Center","address":null,"city":"New York","stateprov":"NY","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-10T00:00:00","dateEnd":"2016-03-13T23:59:59"},{"code":"NYRO","divisionCode":null,"name":"Finger Lakes Regional ","type":"Regional","districtCode":null,"venue":"Gordon Field House","address":null,"city":"Rochester","stateprov":"NY","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-23T00:00:00","dateEnd":"2016-03-26T23:59:59"},{"code":"NYTR","divisionCode":null,"name":"New York Tech Valley Regional","type":"Regional","districtCode":null,"venue":"Rensselaer Polytechnic Institute","address":null,"city":"Troy","stateprov":"NY","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-16T00:00:00","dateEnd":"2016-03-19T23:59:59"},{"code":"OHCI","divisionCode":null,"name":"Queen City Regional","type":"Regional","districtCode":null,"venue":"Cintas Arena - Xavier University","address":null,"city":"Cincinnati","stateprov":"OH","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-30T00:00:00","dateEnd":"2016-04-02T23:59:59"},{"code":"OHCL","divisionCode":null,"name":"Buckeye Regional","type":"Regional","districtCode":null,"venue":"Cleveland State University - Wolstein Center","address":null,"city":"Cleveland","stateprov":"OH","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-16T00:00:00","dateEnd":"2016-03-19T23:59:59"},{"code":"OKOK","divisionCode":null,"name":"Oklahoma Regional ","type":"Regional","districtCode":null,"venue":"Cox Arena - SMG Convention Center","address":null,"city":"Oklahoma City","stateprov":"OK","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2016-03-23T00:00:00","dateEnd":"2016-03-26T23:59:59"},{"code":"ONNB","divisionCode":null,"name":"North Bay Regional","type":"Regional","districtCode":null,"venue":"Nipissing University","address":null,"city":"North Bay","stateprov":"ON","country":"Canada","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-23T00:00:00","dateEnd":"2016-03-26T23:59:59"},{"code":"ONTO","divisionCode":null,"name":"Greater Toronto East Regional ","type":"Regional","districtCode":null,"venue":"University of Ontario Institute of Technology / Durham College","address":null,"city":"Oshawa","stateprov":"ON","country":"Canada","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-09T00:00:00","dateEnd":"2016-03-12T23:59:59"},{"code":"ONTO2","divisionCode":null,"name":"Greater Toronto Central Regional","type":"Regional","districtCode":null,"venue":"Ryerson University - Mattamy Athletic Centre","address":null,"city":"Toronto","stateprov":"ON","country":"Canada","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-02T00:00:00","dateEnd":"2016-03-05T23:59:59"},{"code":"ONWA","divisionCode":null,"name":"Waterloo Regional ","type":"Regional","districtCode":null,"venue":"University of Waterloo - Physical Activities Complex","address":null,"city":"Waterloo","stateprov":"ON","country":"Canada","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-30T00:00:00","dateEnd":"2016-04-02T23:59:59"},{"code":"ONWI","divisionCode":null,"name":"Windsor Essex Great Lakes Regional","type":"Regional","districtCode":null,"venue":"University of Windsor - St. Denis Centre","address":null,"city":"Windsor","stateprov":"ON","country":"Canada","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-04-06T00:00:00","dateEnd":"2016-04-09T23:59:59"},{"code":"ORORE","divisionCode":null,"name":"PNW District - Clackamas Academy of Industrial Science Event","type":"DistrictEvent","districtCode":"PNW","venue":"Clackamas Academy of Industrial Science","address":null,"city":"Oregon City","stateprov":"OR","country":"USA","website":null,"webcasts":[],"timezone":"Pacific Standard Time","dateStart":"2016-03-31T00:00:00","dateEnd":"2016-04-02T23:59:59"},{"code":"ORPHI","divisionCode":null,"name":"PNW District - Philomath Event","type":"DistrictEvent","districtCode":"PNW","venue":"Philomath High School","address":null,"city":"Philomath","stateprov":"OR","country":"USA","website":null,"webcasts":[],"timezone":"Pacific Standard Time","dateStart":"2016-03-24T00:00:00","dateEnd":"2016-03-26T23:59:59"},{"code":"ORWIL","divisionCode":null,"name":"PNW District - Wilsonville Event","type":"DistrictEvent","districtCode":"PNW","venue":"Wilsonville High School","address":null,"city":"Wilsonville","stateprov":"OR","country":"USA","website":null,"webcasts":[],"timezone":"Pacific Standard Time","dateStart":"2016-03-10T00:00:00","dateEnd":"2016-03-12T23:59:59"},{"code":"PACA","divisionCode":null,"name":"Greater Pittsburgh Regional","type":"Regional","districtCode":null,"venue":"California University of Pennsylvania","address":null,"city":"California","stateprov":"PA","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-09T00:00:00","dateEnd":"2016-03-12T23:59:59"},{"code":"PAHAT","divisionCode":null,"name":"MAR District - Hatboro-Horsham Event","type":"DistrictEvent","districtCode":"MAR","venue":"Hatboro-Horsham High School","address":null,"city":"Horsham","stateprov":"PA","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-04T00:00:00","dateEnd":"2016-03-06T23:59:59"},{"code":"PAPHI","divisionCode":null,"name":"MAR District - Springside Chestnut Hill Event","type":"DistrictEvent","districtCode":"MAR","venue":"Springside Chestnut Hill Academy","address":null,"city":"Philadelphia","stateprov":"PA","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-18T00:00:00","dateEnd":"2016-03-20T23:59:59"},{"code":"PAWCH","divisionCode":null,"name":"MAR District - Westtown Event","type":"DistrictEvent","districtCode":"MAR","venue":"Westtown School","address":null,"city":"West Chester","stateprov":"PA","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-04-01T00:00:00","dateEnd":"2016-04-03T23:59:59"},{"code":"PNCMP","divisionCode":null,"name":"Pacific Northwest District Championship sponsored by Autodesk","type":"DistrictChampionship","districtCode":"PNW","venue":"Veterans Memorial Coliseum","address":null,"city":"Portland","stateprov":"OR","country":"USA","website":null,"webcasts":[],"timezone":"Pacific Standard Time","dateStart":"2016-04-06T00:00:00","dateEnd":"2016-04-09T23:59:59"},{"code":"QCMO","divisionCode":null,"name":"FRC Festival de Robotique - Montreal Regional","type":"Regional","districtCode":null,"venue":"Stade Uniprix","address":null,"city":"Montreal","stateprov":"QC","country":"Canada","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-30T00:00:00","dateEnd":"2016-04-02T23:59:59"},{"code":"RIPRO","divisionCode":null,"name":"NE District - Rhode Island Event","type":"DistrictEvent","districtCode":"NE","venue":"Providence Career and Technology Academy","address":null,"city":"Providence","stateprov":"RI","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-24T00:00:00","dateEnd":"2016-03-26T23:59:59"},{"code":"SCMB","divisionCode":null,"name":"Palmetto Regional","type":"Regional","districtCode":null,"venue":"Myrtle Beach Convention Center","address":null,"city":"Myrtle Beach","stateprov":"SC","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-02-24T00:00:00","dateEnd":"2016-02-27T23:59:59"},{"code":"TESLA","divisionCode":"ARTE","name":"FIRST Championship - Tesla Subdivision","type":"ChampionshipSubdivision","districtCode":null,"venue":"The Dome at America's Center","address":null,"city":"St. Louis","stateprov":"MO","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2016-04-27T00:00:00","dateEnd":"2016-04-30T23:59:59"},{"code":"TNKN","divisionCode":null,"name":"Smoky Mountains Regional","type":"Regional","districtCode":null,"venue":"Thompson-Boling Arena - University of Tennessee","address":null,"city":"Knoxville","stateprov":"TN","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-30T00:00:00","dateEnd":"2016-04-02T23:59:59"},{"code":"TXDA","divisionCode":null,"name":"Dallas Regional","type":"Regional","districtCode":null,"venue":"Irving Convention Center","address":null,"city":"Irving","stateprov":"TX","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2016-03-23T00:00:00","dateEnd":"2016-03-26T23:59:59"},{"code":"TXHO","divisionCode":null,"name":"Lone Star Regional","type":"Regional","districtCode":null,"venue":"George R. Brown Convention Center","address":null,"city":"Houston","stateprov":"TX","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2016-04-06T00:00:00","dateEnd":"2016-04-09T23:59:59"},{"code":"TXLU","divisionCode":null,"name":"Hub City Regional","type":"Regional","districtCode":null,"venue":"United Supermarkets Arena - Texas Tech University","address":null,"city":"Lubbock","stateprov":"TX","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2016-03-31T00:00:00","dateEnd":"2016-04-03T23:59:59"},{"code":"TXSA","divisionCode":null,"name":"Alamo Regional sponsored by Rackspace Hosting","type":"Regional","districtCode":null,"venue":"Henry B. Gonzalez Convention Center","address":null,"city":"San Antonio","stateprov":"TX","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2016-03-09T00:00:00","dateEnd":"2016-03-12T23:59:59"},{"code":"UTWV","divisionCode":null,"name":"Utah Regional","type":"Regional","districtCode":null,"venue":"Maverik Center","address":null,"city":"West Valley City","stateprov":"UT","country":"USA","website":null,"webcasts":[],"timezone":"Mountain Standard Time","dateStart":"2016-03-16T00:00:00","dateEnd":"2016-03-19T23:59:59"},{"code":"VABLA","divisionCode":null,"name":"CHS District - Southwest Virginia Event","type":"DistrictEvent","districtCode":"CHS","venue":"Blacksburg High School","address":null,"city":"Blacksburg","stateprov":"VA","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-11T00:00:00","dateEnd":"2016-03-13T23:59:59"},{"code":"VADOS","divisionCode":null,"name":"CHS District - Central Virginia Event","type":"DistrictEvent","districtCode":"CHS","venue":"Farm Bureau Center - Meadow Event Park","address":null,"city":"Doswell","stateprov":"VA","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-24T00:00:00","dateEnd":"2016-03-26T23:59:59"},{"code":"VAHAY","divisionCode":null,"name":"CHS District - Northern Virginia Event","type":"DistrictEvent","districtCode":"CHS","venue":"Battlefield High School","address":null,"city":"Haymarket","stateprov":"VA","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-04T00:00:00","dateEnd":"2016-03-06T23:59:59"},{"code":"VAPOR","divisionCode":null,"name":"CHS District - Hampton Roads Event","type":"DistrictEvent","districtCode":"CHS","venue":"Churchland High School","address":null,"city":"Portsmouth","stateprov":"VA","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-03-18T00:00:00","dateEnd":"2016-03-20T23:59:59"},{"code":"WAAHS","divisionCode":null,"name":"PNW District - Auburn Event","type":"DistrictEvent","districtCode":"PNW","venue":"Auburn High School","address":null,"city":"Auburn","stateprov":"WA","country":"USA","website":null,"webcasts":[],"timezone":"Pacific Standard Time","dateStart":"2016-04-01T00:00:00","dateEnd":"2016-04-03T23:59:59"},{"code":"WAAMV","divisionCode":null,"name":"PNW District - Auburn Mountainview Event","type":"DistrictEvent","districtCode":"PNW","venue":"Auburn Mountainview High School","address":null,"city":"Auburn","stateprov":"WA","country":"USA","website":null,"webcasts":[],"timezone":"Pacific Standard Time","dateStart":"2016-03-03T00:00:00","dateEnd":"2016-03-05T23:59:59"},{"code":"WAELL","divisionCode":null,"name":"PNW District - Central Washington University Event","type":"DistrictEvent","districtCode":"PNW","venue":"Central Washington University - Nicholson Pavilion","address":null,"city":"Ellensburg","stateprov":"WA","country":"USA","website":null,"webcasts":[],"timezone":"Pacific Standard Time","dateStart":"2016-03-17T00:00:00","dateEnd":"2016-03-19T23:59:59"},{"code":"WAMOU","divisionCode":null,"name":"PNW District - Mount Vernon Event","type":"DistrictEvent","districtCode":"PNW","venue":"Mount Vernon High School","address":null,"city":"Mount Vernon","stateprov":"WA","country":"USA","website":null,"webcasts":[],"timezone":"Pacific Standard Time","dateStart":"2016-03-18T00:00:00","dateEnd":"2016-03-20T23:59:59"},{"code":"WASNO","divisionCode":null,"name":"PNW District - Glacier Peak Event","type":"DistrictEvent","districtCode":"PNW","venue":"Glacier Peak High School","address":null,"city":"Snohomish","stateprov":"WA","country":"USA","website":null,"webcasts":[],"timezone":"Pacific Standard Time","dateStart":"2016-03-11T00:00:00","dateEnd":"2016-03-13T23:59:59"},{"code":"WASPO","divisionCode":null,"name":"PNW District - West Valley Event","type":"DistrictEvent","districtCode":"PNW","venue":"West Valley High School","address":null,"city":"Spokane","stateprov":"WA","country":"USA","website":null,"webcasts":[],"timezone":"Pacific Standard Time","dateStart":"2016-03-03T00:00:00","dateEnd":"2016-03-05T23:59:59"},{"code":"WEEK0","divisionCode":null,"name":"Week 0","type":"OffSeason","districtCode":null,"venue":"Merrimack High School","address":null,"city":"Merrimack","stateprov":"NH","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-02-20T00:00:00","dateEnd":"2016-02-20T23:59:59"},{"code":"WIMI","divisionCode":null,"name":"Wisconsin Regional","type":"Regional","districtCode":null,"venue":"UW - Milwaukee Panther Arena","address":null,"city":"Milwaukee","stateprov":"WI","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2016-03-23T00:00:00","dateEnd":"2016-03-26T23:59:59"},{"code":"WVROX","divisionCode":null,"name":"West Virginia ROX","type":"OffSeasonWithAzureSync","districtCode":null,"venue":"West Virginia University","address":null,"city":"Morganstown","stateprov":"WV","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2016-08-04T00:00:00","dateEnd":"2016-08-06T23:59:59"}],"eventCount":143}`);
var events2017Data = JSON.parse(`{"Events":[{"code":"ABCA","divisionCode":null,"name":"Western Canada Regional","type":"Regional","districtCode":null,"venue":"The Olympic Oval","address":"University of Calgary","city":"Calgary","stateprov":"AB","country":"Canada","website":"http://frcwest.com/","webcasts":[],"timezone":"Mountain Standard Time","dateStart":"2017-04-05T00:00:00","dateEnd":"2017-04-08T23:59:59"},{"code":"ALHU","divisionCode":null,"name":"Rocket City Regional","type":"Regional","districtCode":null,"venue":"Von Braun Center","address":"700 Monroe Street SW","city":"Huntsville","stateprov":"AL","country":"USA","website":"http://firstinalabama.org/events/frc-events/rocket-city-regional/","webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-03-22T00:00:00","dateEnd":"2017-03-25T23:59:59"},{"code":"ARCHIMEDES","divisionCode":"ARDA","name":"FIRST Championship - St. Louis - Archimedes Subdivision","type":"ChampionshipSubdivision","districtCode":null,"venue":"America's Center/Dome","address":"901 N Broadway","city":"St. Louis","stateprov":"MO","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-04-26T00:00:00","dateEnd":"2017-04-29T23:59:59"},{"code":"ARDA","divisionCode":"CMPMO","name":"FIRST Championship - St. Louis - ARDA Division","type":"ChampionshipDivision","districtCode":null,"venue":"America's Center/Dome","address":"901 N Broadway","city":"St. Louis","stateprov":"MO","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-04-26T00:00:00","dateEnd":"2017-04-29T23:59:59"},{"code":"ARLI","divisionCode":null,"name":"Arkansas Rock City Regional","type":"Regional","districtCode":null,"venue":"Arkansas State Fairgrounds - Barton Coliseum","address":"Barton Coliseum 2600 Howard Street","city":"Little Rock","stateprov":"AR","country":"USA","website":"http://arfirst.org","webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-03-08T00:00:00","dateEnd":"2017-03-11T23:59:59"},{"code":"AUSC","divisionCode":null,"name":"Southern Cross Regional","type":"Regional","districtCode":null,"venue":"Sydney Olympic Park Sports Centre","address":"Olympic Boulevard","city":"Sydney Olympic Park","stateprov":"NSW","country":"Australia","website":"https://firstaustralia.org/","webcasts":[],"timezone":"AUS Eastern Standard Time","dateStart":"2017-03-13T00:00:00","dateEnd":"2017-03-15T23:59:59"},{"code":"AUSP","divisionCode":null,"name":"South Pacific Regional","type":"Regional","districtCode":null,"venue":"Sydney Olympic Park Sports Centre","address":"Olympic Boulevard","city":"Sydney Olympic Park","stateprov":"NSW","country":"Australia","website":"https://firstaustralia.org/","webcasts":[],"timezone":"AUS Eastern Standard Time","dateStart":"2017-03-16T00:00:00","dateEnd":"2017-03-18T23:59:59"},{"code":"AZCMP","divisionCode":null,"name":"Sanghi Foundation FRC AZ State Championship","type":"OffSeasonWithAzureSync","districtCode":null,"venue":"","address":"Wells Fargo Arena, Arizona State University","city":"Tempe","stateprov":"AZ","country":"USA","website":null,"webcasts":[],"timezone":"Mountain Standard Time","dateStart":"2017-10-21T00:00:00","dateEnd":"2017-10-21T23:59:59"},{"code":"AZFL","divisionCode":null,"name":"Arizona North Regional","type":"Regional","districtCode":null,"venue":"J. Lawrence Walkup Skydome - Northern Arizona University","address":"1701 S. San Francisco Street","city":"Flagstaff","stateprov":"AZ","country":"USA","website":"http://www.azfirst.org/","webcasts":[],"timezone":"US Mountain Standard Time","dateStart":"2017-03-08T00:00:00","dateEnd":"2017-03-11T23:59:59"},{"code":"AZPX","divisionCode":null,"name":"Arizona West Regional","type":"Regional","districtCode":null,"venue":"Grand Canyon University Arena","address":"3300 W. Camelback Road","city":"Phoenix","stateprov":"AZ","country":"USA","website":"http://www.azfirst.org/","webcasts":[],"timezone":"US Mountain Standard Time","dateStart":"2017-04-05T00:00:00","dateEnd":"2017-04-08T23:59:59"},{"code":"BC18","divisionCode":null,"name":"BattleCry 18","type":"OffSeasonWithAzureSync","districtCode":null,"venue":"WPI Harrington Auditorium ","address":"100 Institute Road","city":"Worcester","stateprov":"MA","country":"USA","website":"https://wpi.edu/+bc","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-05-19T00:00:00","dateEnd":"2017-05-21T23:59:59"},{"code":"CADA","divisionCode":null,"name":"Sacramento Regional","type":"Regional","districtCode":null,"venue":"UC Davis ARC Pavilion","address":"Corner of Orchard and LaRue","city":"Davis","stateprov":"CA","country":"USA","website":"http://www.firstsac.org","webcasts":[],"timezone":"Pacific Standard Time","dateStart":"2017-03-22T00:00:00","dateEnd":"2017-03-25T23:59:59"},{"code":"CAIR","divisionCode":null,"name":"Orange County Regional","type":"Regional","districtCode":null,"venue":"University of California, Irvine","address":"Bren Events Center 100 Bren Events Center","city":"Irvine","stateprov":"CA","country":"USA","website":"http://www.firstoc.org/","webcasts":[],"timezone":"Pacific Standard Time","dateStart":"2017-03-29T00:00:00","dateEnd":"2017-04-01T23:59:59"},{"code":"CALB","divisionCode":null,"name":"Los Angeles Regional","type":"Regional","districtCode":null,"venue":"Walter Pyramid","address":"1250 N Bellflower Blvd Long Beach State University","city":"Long Beach","stateprov":"CA","country":"USA","website":"http://www.firstlaregional.com","webcasts":[],"timezone":"Pacific Standard Time","dateStart":"2017-03-23T00:00:00","dateEnd":"2017-03-26T23:59:59"},{"code":"CAMA","divisionCode":null,"name":"Central Valley Regional","type":"Regional","districtCode":null,"venue":"Madera South High School","address":"705 W. Pecan Avenue","city":"Madera","stateprov":"CA","country":"USA","website":"http://www.cvrobotics.org/frc/regional.html","webcasts":[],"timezone":"Pacific Standard Time","dateStart":"2017-03-09T00:00:00","dateEnd":"2017-03-12T23:59:59"},{"code":"CANE","divisionCode":"CMPTX","name":"FIRST Championship - Houston - CANE Division","type":"ChampionshipDivision","districtCode":null,"venue":"George R. Brown Convention Center","address":"1001 Avenida De Las Americas","city":"Houston","stateprov":"TX","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-04-19T00:00:00","dateEnd":"2017-04-22T23:59:59"},{"code":"CARSON","divisionCode":"CATE","name":"FIRST Championship - St. Louis - Carson Subdivision","type":"ChampionshipSubdivision","districtCode":null,"venue":"America's Center/Dome","address":"901 N Broadway","city":"St. Louis","stateprov":"MO","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-04-26T00:00:00","dateEnd":"2017-04-29T23:59:59"},{"code":"CARVER","divisionCode":"CANE","name":"FIRST Championship - Houston - Carver Subdivision","type":"ChampionshipSubdivision","districtCode":null,"venue":"George R. Brown Convention Center","address":"1001 Avenida De Las Americas","city":"Houston","stateprov":"TX","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-04-19T00:00:00","dateEnd":"2017-04-22T23:59:59"},{"code":"CASD","divisionCode":null,"name":"San Diego Regional presented by Qualcomm","type":"Regional","districtCode":null,"venue":"Del Mar Fairgrounds Arena Complex","address":"2260 Jimmy Durante Blvd","city":"Del Mar","stateprov":"CA","country":"USA","website":"http://sandiegoregional.com/","webcasts":[],"timezone":"Pacific Standard Time","dateStart":"2017-03-08T00:00:00","dateEnd":"2017-03-11T23:59:59"},{"code":"CASF","divisionCode":null,"name":"San Francisco Regional","type":"Regional","districtCode":null,"venue":"St. Ignatius College Preparatory","address":"2001 37th Avenue","city":"San Francisco","stateprov":"CA","country":"USA","website":"http://www.firstsfbay.org","webcasts":[],"timezone":"Pacific Standard Time","dateStart":"2017-03-16T00:00:00","dateEnd":"2017-03-19T23:59:59"},{"code":"CASJ","divisionCode":null,"name":"Silicon Valley Regional","type":"Regional","districtCode":null,"venue":"San Jose State University - The Event Center","address":"290 South 7th Street","city":"San Jose","stateprov":"CA","country":"USA","website":"http://www.firstsv.org","webcasts":[],"timezone":"Pacific Standard Time","dateStart":"2017-03-29T00:00:00","dateEnd":"2017-04-01T23:59:59"},{"code":"CATE","divisionCode":"CMPMO","name":"FIRST Championship - St. Louis - CATE Division","type":"ChampionshipDivision","districtCode":null,"venue":"America's Center/Dome","address":"901 N Broadway","city":"St. Louis","stateprov":"MO","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-04-26T00:00:00","dateEnd":"2017-04-29T23:59:59"},{"code":"CAVE","divisionCode":null,"name":"Ventura Regional","type":"Regional","districtCode":null,"venue":"Ventura College","address":"4667 Telegraph Road","city":"Ventura","stateprov":"CA","country":"USA","website":"http://www.frcventuraregional.com/","webcasts":[],"timezone":"Pacific Standard Time","dateStart":"2017-03-15T00:00:00","dateEnd":"2017-03-18T23:59:59"},{"code":"CHCMP","divisionCode":null,"name":"FIRST Chesapeake District Championship sponsored by Booz Allen Hamilton","type":"DistrictChampionship","districtCode":"CHS","venue":"Virginia Commonwealth University","address":"Siegel Center 1200 West Broad Street","city":"Richmond","stateprov":"VA","country":"USA","website":"http://www.firstchesapeake.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-04-05T00:00:00","dateEnd":"2017-04-08T23:59:59"},{"code":"CMPMO","divisionCode":null,"name":"FIRST Championship - St. Louis","type":"Championship","districtCode":null,"venue":"America's Center/Dome","address":"901 N Broadway","city":"St. Louis","stateprov":"MO","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-04-26T00:00:00","dateEnd":"2017-04-29T23:59:59"},{"code":"CMPTX","divisionCode":null,"name":"FIRST Championship - Houston","type":"Championship","districtCode":null,"venue":"George R. Brown Convention Center","address":"1001 Avenida De Las Americas","city":"Houston","stateprov":"TX","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-04-19T00:00:00","dateEnd":"2017-04-22T23:59:59"},{"code":"CODE","divisionCode":null,"name":"Colorado Regional","type":"Regional","districtCode":null,"venue":"University of Denver - Daniel L. Ritchie Center","address":"2201 East Asbury Ave","city":"Denver","stateprov":"CO","country":"USA","website":"http://coloradofirst.org/COFIRST/programs/frc/colorado-regional/","webcasts":[],"timezone":"Mountain Standard Time","dateStart":"2017-03-22T00:00:00","dateEnd":"2017-03-25T23:59:59"},{"code":"CTHAR","divisionCode":null,"name":"NE District - Hartford Event","type":"DistrictEvent","districtCode":"NE","venue":"Hartford Public High School","address":"55 Forest Street","city":"Hartford","stateprov":"CT","country":"USA","website":"http://www.nefirst.org/","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-31T00:00:00","dateEnd":"2017-04-02T23:59:59"},{"code":"CTTD","divisionCode":null,"name":"Cow Town ThrowDown","type":"OffSeasonWithAzureSync","districtCode":null,"venue":"Lee's Summit High School","address":"400 SE Blue Pkwy","city":"Lee's Summit","stateprov":"MO","country":"USA","website":"http://cttd-robotics.com/","webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-10-27T00:00:00","dateEnd":"2017-10-28T23:59:59"},{"code":"CTWAT","divisionCode":null,"name":"NE District - Waterbury Event","type":"DistrictEvent","districtCode":"NE","venue":"Wilby High School","address":"460 Buck Hill Road","city":"Waterbury","stateprov":"CT","country":"USA","website":"http://www.nefirst.org/","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-03T00:00:00","dateEnd":"2017-03-05T23:59:59"},{"code":"CUDA","divisionCode":"CMPMO","name":"FIRST Championship - St. Louis - CUDA Division","type":"ChampionshipDivision","districtCode":null,"venue":"America's Center/Dome","address":"901 N Broadway","city":"St. Louis","stateprov":"MO","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-04-26T00:00:00","dateEnd":"2017-04-29T23:59:59"},{"code":"CURIE","divisionCode":"CUDA","name":"FIRST Championship - St. Louis - Curie Subdivision","type":"ChampionshipSubdivision","districtCode":null,"venue":"America's Center/Dome","address":"901 N Broadway","city":"St. Louis","stateprov":"MO","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-04-26T00:00:00","dateEnd":"2017-04-29T23:59:59"},{"code":"DALY","divisionCode":"ARDA","name":"FIRST Championship - St. Louis - Daly Subdivision","type":"ChampionshipSubdivision","districtCode":null,"venue":"America's Center/Dome","address":"901 N Broadway","city":"St. Louis","stateprov":"MO","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-04-26T00:00:00","dateEnd":"2017-04-29T23:59:59"},{"code":"DARWIN","divisionCode":"CUDA","name":"FIRST Championship - St. Louis - Darwin Subdivision","type":"ChampionshipSubdivision","districtCode":null,"venue":"America's Center/Dome","address":"901 N Broadway","city":"St. Louis","stateprov":"MO","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-04-26T00:00:00","dateEnd":"2017-04-29T23:59:59"},{"code":"EMCC","divisionCode":null,"name":"East Metro Collaborative Competition","type":"OffSeasonWithAzureSync","districtCode":null,"venue":"East Ridge High School","address":"4200 Pioneer Drive","city":"Woodbury","stateprov":"MN","country":"55125","website":"http://www.em-cc.org/","webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-09-16T00:00:00","dateEnd":"2017-09-16T23:59:59"},{"code":"FLOR","divisionCode":null,"name":"Orlando Regional","type":"Regional","districtCode":null,"venue":"CFE Arena at the University of Central Florida","address":"12777 Gemini Blvd N","city":"Orlando","stateprov":"FL","country":"USA","website":"http://orlandofrc.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-08T00:00:00","dateEnd":"2017-03-11T23:59:59"},{"code":"FLWP","divisionCode":null,"name":"South Florida Regional ","type":"Regional","districtCode":null,"venue":"Palm Beach Convention Center","address":"650 Okeechobee Blvd","city":"West Palm Beach","stateprov":"FL","country":"USA","website":"","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-01T00:00:00","dateEnd":"2017-03-04T23:59:59"},{"code":"FOC","divisionCode":null,"name":"Festival of Champions","type":"OffSeasonWithAzureSync","districtCode":null,"venue":"SNHU Arena","address":"555 Elm St","city":"Manchester","stateprov":"NH","country":"USA","website":"https://www.firstchampionship.org/festival-of-champions","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-07-28T00:00:00","dateEnd":"2017-07-29T23:59:59"},{"code":"GAALB","divisionCode":null,"name":"PCH District - Albany Event","type":"DistrictEvent","districtCode":"PCH","venue":"Albany Civic Center","address":"100 W. Oglethorpe Blvd","city":"Albany","stateprov":"GA","country":"USA","website":"http://www.gafirst.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-23T00:00:00","dateEnd":"2017-03-25T23:59:59"},{"code":"GACMP","divisionCode":null,"name":"Peachtree State Championship","type":"DistrictChampionship","districtCode":"PCH","venue":"University of Georgia - Stegeman Coliseum","address":"100 Smith Street","city":"Athens","stateprov":"GA","country":"USA","website":"http://www.gafirst.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-04-05T00:00:00","dateEnd":"2017-04-08T23:59:59"},{"code":"GACOL","divisionCode":null,"name":"PCH District - Columbus Event","type":"DistrictEvent","districtCode":"PCH","venue":"Columbus State University","address":"4225 University Avenue","city":"Columbus","stateprov":"GA","country":"USA","website":"http://www.gafirst.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-16T00:00:00","dateEnd":"2017-03-18T23:59:59"},{"code":"GADAL","divisionCode":null,"name":"PCH District - Dalton Event","type":"DistrictEvent","districtCode":"PCH","venue":"Dalton Convention Center","address":"2211 Dug Gap Battle Road","city":"Dalton","stateprov":"GA","country":"USA","website":"http://www.gafirst.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-09T00:00:00","dateEnd":"2017-03-11T23:59:59"},{"code":"GAGAI","divisionCode":null,"name":"PCH District - Gainesville Event","type":"DistrictEvent","districtCode":"PCH","venue":"Riverside Military Academy","address":"2001 Riverside Drive","city":"Gainesville","stateprov":"GA","country":"USA","website":"http://www.gafirst.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-03T00:00:00","dateEnd":"2017-03-05T23:59:59"},{"code":"GALILEO","divisionCode":"GARO","name":"FIRST Championship - Houston - Galileo Subdivision","type":"ChampionshipSubdivision","districtCode":null,"venue":"George R. Brown Convention Center","address":"1001 Avenida De Las Americas","city":"Houston","stateprov":"TX","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-04-19T00:00:00","dateEnd":"2017-04-22T23:59:59"},{"code":"GARO","divisionCode":"CMPTX","name":"FIRST Championship - Houston - GARO Division","type":"ChampionshipDivision","districtCode":null,"venue":"George R. Brown Convention Center","address":"1001 Avenida De Las Americas","city":"Houston","stateprov":"TX","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-04-19T00:00:00","dateEnd":"2017-04-22T23:59:59"},{"code":"GGGT","divisionCode":null,"name":"Gitchi Gummi Get-Together","type":"OffSeasonWithAzureSync","districtCode":null,"venue":"Duluth East High School","address":"301 N 40th Avenue East","city":"Duluth","stateprov":"MN","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-07-20T00:00:00","dateEnd":"2017-07-22T23:59:59"},{"code":"GRITS","divisionCode":null,"name":"Georgia Robotics Invitational Tournament & Showcase","type":"OffSeasonWithAzureSync","districtCode":null,"venue":"Riverside Military Academy","address":"2001 Riverside Drive","city":"Gainesville","stateprov":"GA","country":"USA","website":"http://gafirst.org/events/grits-2017/","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-10-28T00:00:00","dateEnd":"2017-10-29T23:59:59"},{"code":"GUSH","divisionCode":null,"name":"Shenzhen Regional","type":"Regional","districtCode":null,"venue":"The Sports Center of Shenzhen University","address":"No. 2032 Liuxian Road Nanshan District","city":"Shenzhen City","stateprov":"44","country":"China","website":"http://share.hisports.tv/HiSportVideo.aspx?c=6208","webcasts":[],"timezone":"China Standard Time","dateStart":"2017-03-08T00:00:00","dateEnd":"2017-03-11T23:59:59"},{"code":"HIHO","divisionCode":null,"name":"Hawaii Regional","type":"Regional","districtCode":null,"venue":"University of Hawaii at Manoa","address":"Stan Sheriff Center","city":"Honolulu","stateprov":"HI","country":"USA","website":"http://www.friendsofhawaiirobotics.org","webcasts":[],"timezone":"Hawaiian Standard Time","dateStart":"2017-03-29T00:00:00","dateEnd":"2017-04-01T23:59:59"},{"code":"HOPPER","divisionCode":"HOTU","name":"FIRST Championship - Houston - Hopper Subdivision","type":"ChampionshipSubdivision","districtCode":null,"venue":"George R. Brown Convention Center","address":"1001 Avenida De Las Americas","city":"Houston","stateprov":"TX","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-04-19T00:00:00","dateEnd":"2017-04-22T23:59:59"},{"code":"HOTU","divisionCode":"CMPTX","name":"FIRST Championship - Houston - HOTU Division","type":"ChampionshipDivision","districtCode":null,"venue":"George R. Brown Convention Center","address":"1001 Avenida De Las Americas","city":"Houston","stateprov":"TX","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-04-19T00:00:00","dateEnd":"2017-04-22T23:59:59"},{"code":"IACF","divisionCode":null,"name":"Iowa Regional","type":"Regional","districtCode":null,"venue":"McLeod Center/UNI Dome","address":"2501 Hudson Road","city":"Cedar Falls","stateprov":"IA","country":"USA","website":"http://iafirst.org/","webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-03-22T00:00:00","dateEnd":"2017-03-25T23:59:59"},{"code":"IDBO","divisionCode":null,"name":"Idaho Regional","type":"Regional","districtCode":null,"venue":"Boise State University at Taco Bell Arena","address":"1401 Bronco Lane","city":"Boise","stateprov":"ID","country":"USA","website":null,"webcasts":[],"timezone":"Mountain Standard Time","dateStart":"2017-03-29T00:00:00","dateEnd":"2017-04-01T23:59:59"},{"code":"ILCH","divisionCode":null,"name":"Midwest Regional","type":"Regional","districtCode":null,"venue":"UIC Pavilion ","address":"University of Illinois, Chicago 525 S. Racine Ave","city":"Chicago","stateprov":"IL","country":"USA","website":"http://www.firstillinoisrobotics.org/frc/events/midwest-regional.html","webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-03-29T00:00:00","dateEnd":"2017-04-01T23:59:59"},{"code":"ILPE","divisionCode":null,"name":"Central Illinois Regional","type":"Regional","districtCode":null,"venue":"Renaissance Coliseum - Bradley University","address":"1600 W. Main Street","city":"Peoria","stateprov":"IL","country":"USA","website":"http://www.firstillinoisrobotics.org/frc/events/central-illinois-regional/","webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-03-15T00:00:00","dateEnd":"2017-03-18T23:59:59"},{"code":"INCMP","divisionCode":null,"name":"Indiana State Championship","type":"DistrictChampionship","districtCode":"IN","venue":"Huntington North High School","address":"450 McGahn Street","city":"Huntington","stateprov":"IN","country":"USA","website":"http://www.indianafirst.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-04-06T00:00:00","dateEnd":"2017-04-08T23:59:59"},{"code":"INMIS","divisionCode":null,"name":"IN District - St. Joseph Event","type":"DistrictEvent","districtCode":"IN","venue":"Penn High School","address":"56100 Bittersweet Road","city":"Mishawaka","stateprov":"IN","country":"USA","website":"http://www.indianafirst.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-10T00:00:00","dateEnd":"2017-03-12T23:59:59"},{"code":"INPMH","divisionCode":null,"name":"IN District - Perry Meridian Event","type":"DistrictEvent","districtCode":"IN","venue":"Perry Meridian High School","address":"401 W. Meridian School Road","city":"Indianapolis","stateprov":"IN","country":"USA","website":"http://www.indianafirst.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-23T00:00:00","dateEnd":"2017-03-25T23:59:59"},{"code":"INWLA","divisionCode":null,"name":"IN District - Tippecanoe Event","type":"DistrictEvent","districtCode":"IN","venue":"William Henry Harrison High School","address":"5701 N 50 W","city":"West Lafayette","stateprov":"IN","country":"USA","website":"http://www.indianafirst.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-03T00:00:00","dateEnd":"2017-03-05T23:59:59"},{"code":"IRI","divisionCode":null,"name":"Indiana Robotics Invitational","type":"OffSeasonWithAzureSync","districtCode":null,"venue":"Lawrence North High School","address":"7802 Hague Road","city":"Indianapolis","stateprov":"IN","country":"USA","website":"http://indianaroboticsinvitational.org/","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-07-14T00:00:00","dateEnd":"2017-07-15T23:59:59"},{"code":"IROC","divisionCode":null,"name":"IROC","type":"OffSeasonWithAzureSync","districtCode":null,"venue":"Battlefield High School","address":"15000 Graduation Drive","city":"Haymarket","stateprov":"VA","country":"USA","website":"http://irocoffseason.org/","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-10-21T00:00:00","dateEnd":"2017-10-21T23:59:59"},{"code":"ISCMP","divisionCode":null,"name":"FIRST Israel District Championship","type":"DistrictChampionship","districtCode":"ISR","venue":"Menora Mivtachim Arena","address":"51 Yigal Allon Street","city":"Tel Aviv-Yafo","stateprov":"TA","country":"Israel","website":"http://firstisrael.org.il","webcasts":[],"timezone":"Israel Standard Time","dateStart":"2017-03-28T00:00:00","dateEnd":"2017-03-30T23:59:59"},{"code":"ISDE1","divisionCode":null,"name":"ISR District Event #1","type":"DistrictEvent","districtCode":"ISR","venue":"Technion Sports Center","address":"Technion","city":"Haifa","stateprov":"HA","country":"Israel","website":"http://firstisrael.org.il","webcasts":[],"timezone":"Israel Standard Time","dateStart":"2017-03-06T00:00:00","dateEnd":"2017-03-07T23:59:59"},{"code":"ISDE2","divisionCode":null,"name":"ISR District Event #2","type":"DistrictEvent","districtCode":"ISR","venue":"Technion Sports Center","address":"Technion","city":"Haifa","stateprov":"HA","country":"Israel","website":"http://firstisrael.org.il","webcasts":[],"timezone":"Israel Standard Time","dateStart":"2017-03-08T00:00:00","dateEnd":"2017-03-09T23:59:59"},{"code":"ISDE3","divisionCode":null,"name":"ISR District Event #3","type":"DistrictEvent","districtCode":"ISR","venue":"Shlomo Group Arena","address":"7 Isaac Remba St","city":"Tel-Aviv, Yafo","stateprov":"TA","country":"Israel","website":"http://firstisrael.org.il","webcasts":[],"timezone":"Israel Standard Time","dateStart":"2017-03-13T00:00:00","dateEnd":"2017-03-15T23:59:59"},{"code":"ISDE4","divisionCode":null,"name":"ISR District Event #4","type":"DistrictEvent","districtCode":"ISR","venue":"Shlomo Group Arena","address":"7 Isaac Remba St","city":"Tel-Aviv, Yafo","stateprov":"TA","country":"Israel","website":"http://firstisrael.org.il","webcasts":[],"timezone":"Israel Standard Time","dateStart":"2017-03-15T00:00:00","dateEnd":"2017-03-17T23:59:59"},{"code":"LAKE","divisionCode":null,"name":"Bayou Regional","type":"Regional","districtCode":null,"venue":"Pontchartrain Center","address":"Pontchartrain Center  4545 Williams Blvd","city":"Kenner","stateprov":"LA","country":"USA","website":"http://www.frcbayouregional.org","webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-03-22T00:00:00","dateEnd":"2017-03-25T23:59:59"},{"code":"MABOS","divisionCode":null,"name":"NE District - Greater Boston Event","type":"DistrictEvent","districtCode":"NE","venue":"Revere High School","address":"101 School Street","city":"Revere","stateprov":"MA","country":"USA","website":"http://www.nefirst.org/","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-17T00:00:00","dateEnd":"2017-03-19T23:59:59"},{"code":"MABRI","divisionCode":null,"name":"NE District - SE Mass Event","type":"DistrictEvent","districtCode":"NE","venue":"Bridgewater-Raynham High School","address":"415 Center Street","city":"Bridgewater","stateprov":"MA","country":"USA","website":"http://www.nefirst.org/","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-10T00:00:00","dateEnd":"2017-03-12T23:59:59"},{"code":"MAREA","divisionCode":null,"name":"NE District - North Shore Event","type":"DistrictEvent","districtCode":"NE","venue":"Reading Memorial High School","address":"62 Oakland Road","city":"Reading","stateprov":"MA","country":"USA","website":"http://www.nefirst.org/","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-17T00:00:00","dateEnd":"2017-03-19T23:59:59"},{"code":"MAWOR","divisionCode":null,"name":"NE District - Worcester Polytechnic Institute Event","type":"DistrictEvent","districtCode":"NE","venue":"WPI Harrington Auditorium ","address":"100 Institute Road","city":"Worcester","stateprov":"MA","country":"USA","website":"http://www.nefirst.org/","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-08T00:00:00","dateEnd":"2017-03-10T23:59:59"},{"code":"MDBET","divisionCode":null,"name":"CHS District - Greater DC Event sponsored by Accenture","type":"DistrictEvent","districtCode":"CHS","venue":"Walt Whitman High School","address":"7100 Whittier Blvd","city":"Bethesda","stateprov":"MD","country":"USA","website":"http://www.firstchesapeake.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-10T00:00:00","dateEnd":"2017-03-12T23:59:59"},{"code":"MDBOB","divisionCode":null,"name":"Battle O' Baltimore","type":"OffSeasonWithAzureSync","districtCode":null,"venue":"McDonogh School","address":"8600 McDonogh Rd","city":"Owings Mills","stateprov":"MD","country":"USA","website":"http://www.battleobaltimore.com/","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-09-23T00:00:00","dateEnd":"2017-09-23T23:59:59"},{"code":"MDEDG","divisionCode":null,"name":"CHS District - Central Maryland Event sponsored by Leidos","type":"DistrictEvent","districtCode":"CHS","venue":"South River High School","address":"201 Central Avenue East","city":"Edgewater","stateprov":"MD","country":"USA","website":"http://www.firstchesapeake.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-24T00:00:00","dateEnd":"2017-03-26T23:59:59"},{"code":"MDOWI","divisionCode":null,"name":"CHS District - Northern Maryland Event","type":"DistrictEvent","districtCode":"CHS","venue":"McDonogh School","address":"8600 McDonogh Road","city":"Owings Mills","stateprov":"MD","country":"USA","website":"http://www.firstchesapeake.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-17T00:00:00","dateEnd":"2017-03-19T23:59:59"},{"code":"MELEW","divisionCode":null,"name":"NE District - Pine Tree Event","type":"DistrictEvent","districtCode":"NE","venue":"Androscoggin Bank Colisee","address":"190 Birch Street","city":"Lewiston","stateprov":"ME","country":"USA","website":"http://www.nefirst.org/","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-30T00:00:00","dateEnd":"2017-04-01T23:59:59"},{"code":"MEMS","divisionCode":null,"name":"Mainely SPIRIT 7","type":"OffSeasonWithAzureSync","districtCode":null,"venue":"Messalonskee High School","address":"131 Messalonskee High Drive","city":"Oakland","stateprov":"ME","country":"USA","website":"http://offseason.team2648.com/","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-09-09T00:00:00","dateEnd":"2017-09-09T23:59:59"},{"code":"MESH","divisionCode":null,"name":"Summer Heat","type":"OffSeasonWithAzureSync","districtCode":null,"venue":"South Portland High School","address":"637 Highland Ave","city":"South Portland","stateprov":"ME","country":"USA","website":"http://riotcrew.org/SummerHeat.aspx","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-07-15T00:00:00","dateEnd":"2017-07-15T23:59:59"},{"code":"MIANN","divisionCode":null,"name":"FIM District - Ann Arbor Pioneer Event","type":"DistrictEvent","districtCode":"FIM","venue":"Pioneer High School","address":"601 West Stadium Boulevard","city":"Ann Arbor","stateprov":"MI","country":"USA","website":"http://www.firstinmichigan.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-09T00:00:00","dateEnd":"2017-03-11T23:59:59"},{"code":"MIBRO","divisionCode":null,"name":"FIM District - Woodhaven Event","type":"DistrictEvent","districtCode":"FIM","venue":"Woodhaven High School","address":"24787 Van Horn Road","city":"Brownstown","stateprov":"MI","country":"USA","website":"http://www.firstinmichigan.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-23T00:00:00","dateEnd":"2017-03-25T23:59:59"},{"code":"MICEN","divisionCode":null,"name":"FIM District - Center Line Event","type":"DistrictEvent","districtCode":"FIM","venue":"Center Line High School","address":"26300 Arsenal","city":"Center Line","stateprov":"MI","country":"USA","website":"http://www.firstinmichigan.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-09T00:00:00","dateEnd":"2017-03-11T23:59:59"},{"code":"MICMP","divisionCode":null,"name":"Michigan State Championship","type":"DistrictChampionshipWithLevels","districtCode":"FIM","venue":"Saginaw Valley State University","address":"Ryder Center 7400 Bay Road","city":"University Center","stateprov":"MI","country":"USA","website":"http://www.firstinmichigan.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-04-12T00:00:00","dateEnd":"2017-04-15T23:59:59"},{"code":"MICMP1","divisionCode":"MICMP","name":"Michigan State Championship - Consumers Energy Division","type":"DistrictChampionshipDivision","districtCode":"FIM","venue":"Saginaw Valley State University","address":"Ryder Center 7400 Bay Road","city":"University Center","stateprov":"MI","country":"USA","website":"http://www.firstinmichigan.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-04-12T00:00:00","dateEnd":"2017-04-15T23:59:59"},{"code":"MICMP2","divisionCode":"MICMP","name":"Michigan State Championship - Dow Division","type":"DistrictChampionshipDivision","districtCode":"FIM","venue":"Saginaw Valley State University","address":"Ryder Center 7400 Bay Road","city":"University Center","stateprov":"MI","country":"USA","website":"http://www.firstinmichigan.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-04-12T00:00:00","dateEnd":"2017-04-15T23:59:59"},{"code":"MICMP3","divisionCode":"MICMP","name":"Michigan State Championship - DTE Energy Foundation Division","type":"DistrictChampionshipDivision","districtCode":"FIM","venue":"Saginaw Valley State University","address":"Ryder Center 7400 Bay Road","city":"University Center","stateprov":"MI","country":"USA","website":"http://www.firstinmichigan.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-04-12T00:00:00","dateEnd":"2017-04-15T23:59:59"},{"code":"MICMP4","divisionCode":"MICMP","name":"Michigan State Championship - Ford Division","type":"DistrictChampionshipDivision","districtCode":"FIM","venue":"Saginaw Valley State University","address":"Ryder Center 7400 Bay Road","city":"University Center","stateprov":"MI","country":"USA","website":"http://www.firstinmichigan.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-04-12T00:00:00","dateEnd":"2017-04-15T23:59:59"},{"code":"MIESC","divisionCode":null,"name":"FIM District - Escanaba Event","type":"DistrictEvent","districtCode":"FIM","venue":"Escanaba High School","address":"500 S. Lincoln Road","city":"Escanaba","stateprov":"MI","country":"USA","website":"http://www.firstinmichigan.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-16T00:00:00","dateEnd":"2017-03-18T23:59:59"},{"code":"MIGAY","divisionCode":null,"name":"FIM District - Gaylord Event","type":"DistrictEvent","districtCode":"FIM","venue":"Gaylord High School","address":"90 Livingston Blvd","city":"Gaylord","stateprov":"MI","country":"USA","website":"http://www.firstinmichigan.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-16T00:00:00","dateEnd":"2017-03-18T23:59:59"},{"code":"MIGUL","divisionCode":null,"name":"FIM District - Gull Lake Event","type":"DistrictEvent","districtCode":"FIM","venue":"Gull Lake High School","address":"7753 N. 34th Street","city":"Richland","stateprov":"MI","country":"USA","website":"http://www.firstinmichigan.org/","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-16T00:00:00","dateEnd":"2017-03-18T23:59:59"},{"code":"MIHOW","divisionCode":null,"name":"FIM District - Howell Event","type":"DistrictEvent","districtCode":"FIM","venue":"Parker Middle School","address":"400 Wright Road","city":"Howell","stateprov":"MI","country":"USA","website":"http://www.firstinmichigan.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-30T00:00:00","dateEnd":"2017-04-01T23:59:59"},{"code":"MIKE2","divisionCode":null,"name":"FIM District - Kettering University Event #2","type":"DistrictEvent","districtCode":"FIM","venue":"Kettering University","address":"Recreation Center","city":"Flint","stateprov":"MI","country":"USA","website":"http://www.firstinmichigan.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-09T00:00:00","dateEnd":"2017-03-11T23:59:59"},{"code":"MIKEN","divisionCode":null,"name":"FIM District - East Kentwood Event","type":"DistrictEvent","districtCode":"FIM","venue":"East Kentwood High School","address":"6230 Kalamazoo Avenue","city":"Kentwood","stateprov":"MI","country":"USA","website":"http://www.firstinmichigan.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-30T00:00:00","dateEnd":"2017-04-01T23:59:59"},{"code":"MIKET","divisionCode":null,"name":"FIM District - Kettering University Event #1","type":"DistrictEvent","districtCode":"FIM","venue":"Kettering University","address":"Recreation Center","city":"Flint","stateprov":"MI","country":"USA","website":"http://www.firstinmichigan.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-02T00:00:00","dateEnd":"2017-03-04T23:59:59"},{"code":"MILAK","divisionCode":null,"name":"FIM District - Lakeview Event","type":"DistrictEvent","districtCode":"FIM","venue":"Lakeview High School","address":"15060 Helmer Rd S","city":"Battle Creek","stateprov":"MI","country":"USA","website":"http://www.firstinmichigan.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-02T00:00:00","dateEnd":"2017-03-04T23:59:59"},{"code":"MILAN","divisionCode":null,"name":"FIM District - Lansing Event","type":"DistrictEvent","districtCode":"FIM","venue":"Mason High School","address":"1001 S. Barns Street","city":"Mason","stateprov":"MI","country":"USA","website":"http://www.firstinmichigan.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-23T00:00:00","dateEnd":"2017-03-25T23:59:59"},{"code":"MILIV","divisionCode":null,"name":"FIM District - Livonia Event","type":"DistrictEvent","districtCode":"FIM","venue":"Churchill High School","address":"8900 Newburgh Road","city":"Livonia","stateprov":"MI","country":"USA","website":"http://www.firstinmichigan.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-04-06T00:00:00","dateEnd":"2017-04-08T23:59:59"},{"code":"MILSU","divisionCode":null,"name":"FIM District - Lake Superior State University Event","type":"DistrictEvent","districtCode":"FIM","venue":"Lake Superior State University","address":"Norris Center 650 Meridian Street","city":"Sault Ste. Marie","stateprov":"MI","country":"USA","website":"http://www.firstinmichigan.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-30T00:00:00","dateEnd":"2017-04-01T23:59:59"},{"code":"MIMAR","divisionCode":null,"name":"FIM District - Marysville Event","type":"DistrictEvent","districtCode":"FIM","venue":"Marysville High School","address":"555 E. Huron Blvd.","city":"Marysville","stateprov":"MI","country":"USA","website":"http://www.firstinmichigan.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-04-06T00:00:00","dateEnd":"2017-04-08T23:59:59"},{"code":"MIMID","divisionCode":null,"name":"FIM District - Midland Event","type":"DistrictEvent","districtCode":"FIM","venue":"H.H. Dow High School","address":"3901 N. Saginaw Road","city":"Midland","stateprov":"MI","country":"USA","website":"http://www.firstinmichigan.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-23T00:00:00","dateEnd":"2017-03-25T23:59:59"},{"code":"MISHE","divisionCode":null,"name":"FIM District - Shepherd Event","type":"DistrictEvent","districtCode":"FIM","venue":"Shepherd High School","address":"100 E Hall Street","city":"Shepherd","stateprov":"MI","country":"USA","website":"http://www.firstinmichigan.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-04-06T00:00:00","dateEnd":"2017-04-08T23:59:59"},{"code":"MISJO","divisionCode":null,"name":"FIM District - St. Joseph Event","type":"DistrictEvent","districtCode":"FIM","venue":"St. Joseph High School","address":"2521 Stadium Drive","city":"St. Joseph","stateprov":"MI","country":"USA","website":"http://www.firstinmichigan.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-09T00:00:00","dateEnd":"2017-03-11T23:59:59"},{"code":"MISOU","divisionCode":null,"name":"FIM District - Southfield Event","type":"DistrictEvent","districtCode":"FIM","venue":"Southfield High School","address":"24675 Lahser Road","city":"Southfield","stateprov":"MI","country":"USA","website":"http://www.firstinmichigan.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-02T00:00:00","dateEnd":"2017-03-04T23:59:59"},{"code":"MITRY","divisionCode":null,"name":"FIM District - Troy Event","type":"DistrictEvent","districtCode":"FIM","venue":"Troy Athens High School","address":"4333 John R Road","city":"Troy","stateprov":"MI","country":"USA","website":"http://www.firstinmichigan.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-30T00:00:00","dateEnd":"2017-04-01T23:59:59"},{"code":"MITVC","divisionCode":null,"name":"FIM District - Traverse City Event","type":"DistrictEvent","districtCode":"FIM","venue":"Traverse City Central High School","address":"1150 Miliken Drive","city":"Traverse City","stateprov":"MI","country":"USA","website":"http://www.firstinmichigan.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-04-06T00:00:00","dateEnd":"2017-04-08T23:59:59"},{"code":"MIWAT","divisionCode":null,"name":"FIM District - Waterford Event","type":"DistrictEvent","districtCode":"FIM","venue":"Waterford Mott High School","address":"1151 Scott Lake Road","city":"Waterford","stateprov":"MI","country":"USA","website":"http://www.firstinmichigan.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-16T00:00:00","dateEnd":"2017-03-18T23:59:59"},{"code":"MIWMI","divisionCode":null,"name":"FIM District - West Michigan Event","type":"DistrictEvent","districtCode":"FIM","venue":"Grand Valley State University","address":"Field House","city":"Allendale","stateprov":"MI","country":"USA","website":"http://www.firstinmichigan.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-23T00:00:00","dateEnd":"2017-03-25T23:59:59"},{"code":"MNCL","divisionCode":null,"name":"Northern Minnesota Robotics Conference Tournament","type":"OffSeasonWithAzureSync","districtCode":null,"venue":"Cass Lake-Bena HS","address":"15308 State HWY 371 NW","city":"Cass Lake","stateprov":"MN","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-10-28T00:00:00","dateEnd":"2017-10-28T23:59:59"},{"code":"MNCMP","divisionCode":null,"name":"MSHSL FIRST State Robotics Championship","type":"OffSeasonWithAzureSync","districtCode":null,"venue":"Mariucci Arena","address":"4 Oak Street NE","city":"Minneapolis","stateprov":"MN","country":"USA","website":"http://mnfirst.org/offseason/mshsl","webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-05-20T00:00:00","dateEnd":"2017-05-20T23:59:59"},{"code":"MNDU","divisionCode":null,"name":"Lake Superior Regional","type":"Regional","districtCode":null,"venue":"DECC Arena/South Pioneer Hall","address":"Duluth Entertainment Convention Center 350 Harbor Drive","city":"Duluth","stateprov":"MN","country":"USA","website":"http://www.mnfirst.org","webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-03-01T00:00:00","dateEnd":"2017-03-04T23:59:59"},{"code":"MNDU2","divisionCode":null,"name":"Northern Lights Regional","type":"Regional","districtCode":null,"venue":"DECC Arena/Edmund Fitzgerald Exhibit Hall","address":"Duluth Entertainment Convention Center 350 Harbor Drive","city":"Duluth","stateprov":"MN","country":"USA","website":"http://www.mnfirst.org","webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-03-01T00:00:00","dateEnd":"2017-03-04T23:59:59"},{"code":"MNMI","divisionCode":null,"name":"Minnesota 10000 Lakes Regional","type":"Regional","districtCode":null,"venue":"Williams Arena/The Sports Pavilion Univ of MN","address":"1925 University Avenue SE","city":"Minneapolis","stateprov":"MN","country":"USA","website":"http://www.mnfirst.org","webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-04-05T00:00:00","dateEnd":"2017-04-08T23:59:59"},{"code":"MNMI2","divisionCode":null,"name":"Minnesota North Star Regional","type":"Regional","districtCode":null,"venue":"Mariucci Arena - University of Minnesota","address":"1901 4th Street SE","city":"Minneapolis","stateprov":"MN","country":"USA","website":"http://www.mnfirst.org","webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-04-05T00:00:00","dateEnd":"2017-04-08T23:59:59"},{"code":"MNRI","divisionCode":null,"name":"Minnesota Robotics Invitational","type":"OffSeasonWithAzureSync","districtCode":null,"venue":"Roseville Area High School","address":"1240 West County Road B2","city":"Roseville","stateprov":"MN","country":"USA","website":"http://firebears.org/?page_id=375","webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-10-14T00:00:00","dateEnd":"2017-10-14T23:59:59"},{"code":"MOKC","divisionCode":null,"name":"Greater Kansas City Regional","type":"Regional","districtCode":null,"venue":"Metropolitan Community College/Bus. & Tech. Campus","address":"1775 Universal Avenue","city":"Kansas City","stateprov":"MO","country":"USA","website":"http://www.kcfirst.org","webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-03-15T00:00:00","dateEnd":"2017-03-18T23:59:59"},{"code":"MOSL","divisionCode":null,"name":"St. Louis Regional","type":"Regional","districtCode":null,"venue":"Chaifetz Arena","address":"1 S. Compton Ave","city":"St. Louis","stateprov":"MO","country":"USA","website":"http://www.stlfirst.org/","webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-03-08T00:00:00","dateEnd":"2017-03-11T23:59:59"},{"code":"MRCMP","divisionCode":null,"name":"FIRST Mid-Atlantic District Championship sponsored by Johnson & Johnson","type":"DistrictChampionship","districtCode":"MAR","venue":"Lehigh University - Stabler Arena","address":"124 Goodman Drive","city":"Bethlehem","stateprov":"PA","country":"USA","website":"http://www.midatlanticrobotics.com/","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-04-05T00:00:00","dateEnd":"2017-04-08T23:59:59"},{"code":"MXTL","divisionCode":null,"name":"Toluca Regional","type":"Regional","districtCode":null,"venue":"ITESM Campus Toluca","address":"Eduardo Monroy Cardenas 2000 San Antonio Buenavista, C.P.","city":"Toluca de Lerdo","stateprov":"MEX","country":"Mexico","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-03-01T00:00:00","dateEnd":"2017-03-04T23:59:59"},{"code":"MXTO","divisionCode":null,"name":"Laguna Regional","type":"Regional","districtCode":null,"venue":"ITESM Campus Laguna - Santiago Garza de la Mora","address":"Paseo del Tecnologico #751","city":"Torreon","stateprov":"COA","country":"Mexico","website":"http://www.firstlagunaregional.com.mx/","webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-03-29T00:00:00","dateEnd":"2017-04-01T23:59:59"},{"code":"NCASH","divisionCode":null,"name":"NC District - UNC Asheville Event","type":"DistrictEvent","districtCode":"NC","venue":"UNC Asheville - Kimmel Arena","address":"227 Campus Drive","city":"Asheville","stateprov":"NC","country":"USA","website":"http://www.firstnorthcarolina.org/","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-17T00:00:00","dateEnd":"2017-03-19T23:59:59"},{"code":"NCCMP","divisionCode":null,"name":"FIRST North Carolina State Championship","type":"DistrictChampionship","districtCode":"NC","venue":"Campbell University - Gore Arena","address":"56 Main Street","city":"Lillington","stateprov":"NC","country":"USA","website":"http://www.firstnorthcarolina.org/","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-31T00:00:00","dateEnd":"2017-04-02T23:59:59"},{"code":"NCGRE","divisionCode":null,"name":"NC District - Greensboro Event","type":"DistrictEvent","districtCode":"NC","venue":"UNC Greensboro - Fleming Gym","address":"1408 Walker Avenue","city":"Greensboro","stateprov":"NC","country":"USA","website":"http://www.firstnorthcarolina.org/","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-09T00:00:00","dateEnd":"2017-03-11T23:59:59"},{"code":"NCRAL","divisionCode":null,"name":"NC District - Raleigh Event","type":"DistrictEvent","districtCode":"NC","venue":"SE Raleigh Magnet High School","address":"2600 Rock Quarry Road","city":"Raleigh","stateprov":"NC","country":"USA","website":"http://www.firstnorthcarolina.org/","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-23T00:00:00","dateEnd":"2017-03-25T23:59:59"},{"code":"NCWIN","divisionCode":null,"name":"NC District - Pitt County Event","type":"DistrictEvent","districtCode":"NC","venue":"South Central High School","address":"570 Forlines Road","city":"Winterville","stateprov":"NC","country":"USA","website":"http://www.firstnorthcarolina.org/","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-03T00:00:00","dateEnd":"2017-03-05T23:59:59"},{"code":"NECMP","divisionCode":null,"name":"New England District Championship","type":"DistrictChampionship","districtCode":"NE","venue":"UNH Whittemore Center","address":"128 Main Street","city":"Durham","stateprov":"NH","country":"USA","website":"http://www.nefirst.org/","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-04-05T00:00:00","dateEnd":"2017-04-08T23:59:59"},{"code":"NEWTON","divisionCode":"CANE","name":"FIRST Championship - Houston - Newton Subdivision","type":"ChampionshipSubdivision","districtCode":null,"venue":"George R. Brown Convention Center","address":"1001 Avenida De Las Americas","city":"Houston","stateprov":"TX","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-04-19T00:00:00","dateEnd":"2017-04-22T23:59:59"},{"code":"NHBED","divisionCode":null,"name":"NE District - Southern NH Event","type":"DistrictEvent","districtCode":"NE","venue":"Bedford High School","address":"47 Nashua Road","city":"Bedford","stateprov":"NH","country":"USA","website":"http://www.nefirst.org/","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-24T00:00:00","dateEnd":"2017-03-26T23:59:59"},{"code":"NHBOB","divisionCode":null,"name":"Battle Of the Bay","type":"OffSeasonWithAzureSync","districtCode":null,"venue":"Prospect Mountain High School","address":"242 Suncook Valley Road","city":"Alton","stateprov":"NH","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-11-11T00:00:00","dateEnd":"2017-11-11T23:59:59"},{"code":"NHGRS","divisionCode":null,"name":"NE District - Granite State Event","type":"DistrictEvent","districtCode":"NE","venue":"Windham High School","address":"64 London Bridge Road","city":"Windham","stateprov":"NH","country":"USA","website":"http://www.nefirst.org/","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-03T00:00:00","dateEnd":"2017-03-05T23:59:59"},{"code":"NHRR","divisionCode":null,"name":"RiverRage 21","type":"OffSeasonWithAzureSync","districtCode":null,"venue":"Memorial High School","address":"1 Crusader Way","city":"Manchester","stateprov":"NH","country":"USA","website":"http://riverrage.org/","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-10-14T00:00:00","dateEnd":"2017-10-14T23:59:59"},{"code":"NJBE","divisionCode":null,"name":"Brunswick Eruption","type":"OffSeasonWithAzureSync","districtCode":null,"venue":"North Brunswick Township High School","address":"98 Raider Rd.","city":"North Brunswick","stateprov":"NJ","country":"USA","website":"http://be.raiderrobotix.org/","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-11-11T00:00:00","dateEnd":"2017-11-11T23:59:59"},{"code":"NJBRI","divisionCode":null,"name":"MAR District - Bridgewater-Raritan Event","type":"DistrictEvent","districtCode":"MAR","venue":"Bridgewater-Raritan High School","address":"600 Garretson Road","city":"Bridgewater","stateprov":"NJ","country":"USA","website":"http://www.midatlanticrobotics.com/","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-17T00:00:00","dateEnd":"2017-03-19T23:59:59"},{"code":"NJFLA","divisionCode":null,"name":"MAR District - Mount Olive Event","type":"DistrictEvent","districtCode":"MAR","venue":"Mount Olive High School","address":"18 Corey Road","city":"Flanders","stateprov":"NJ","country":"USA","website":"http://www.midatlanticrobotics.com/","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-10T00:00:00","dateEnd":"2017-03-12T23:59:59"},{"code":"NJSKI","divisionCode":null,"name":"MAR District - Montgomery Event","type":"DistrictEvent","districtCode":"MAR","venue":"Montgomery Township High School","address":"1016 Route 601","city":"Skillman","stateprov":"NJ","country":"USA","website":"http://www.midatlanticrobotics.com/","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-31T00:00:00","dateEnd":"2017-04-02T23:59:59"},{"code":"NJTAB","divisionCode":null,"name":"MAR District - Seneca Event","type":"DistrictEvent","districtCode":"MAR","venue":"Seneca High School","address":"110 Carranza Road","city":"Tabernacle","stateprov":"NJ","country":"USA","website":"http://www.midatlanticrobotics.com/","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-24T00:00:00","dateEnd":"2017-03-26T23:59:59"},{"code":"NTTR","divisionCode":null,"name":"North Texas Tournament of Robots","type":"OffSeasonWithAzureSync","districtCode":null,"venue":"Williams High School","address":"1717 17th Street","city":"Plano","stateprov":"TX","country":"USA","website":"https://ntxrobotics.com/","webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-10-07T00:00:00","dateEnd":"2017-10-08T23:59:59"},{"code":"NVLV","divisionCode":null,"name":"Las Vegas Regional","type":"Regional","districtCode":null,"venue":"Cashman Center","address":"850 N. Las Vegas Blvd","city":"Las Vegas","stateprov":"NV","country":"USA","website":"http://www.firstnevada.org","webcasts":[],"timezone":"Pacific Standard Time","dateStart":"2017-04-05T00:00:00","dateEnd":"2017-04-08T23:59:59"},{"code":"NYLI","divisionCode":null,"name":"SBPLI Long Island Regional","type":"Regional","districtCode":null,"venue":"Hofstra University","address":"Hofstra Arena","city":"Hempstead","stateprov":"NY","country":"USA","website":"http://www.sbpli-lifirst.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-29T00:00:00","dateEnd":"2017-04-01T23:59:59"},{"code":"NYNY","divisionCode":null,"name":"New York City Regional","type":"Regional","districtCode":null,"venue":"The Armory Track & Field Center","address":"216 Fort Washington Avenue","city":"New York","stateprov":"NY","country":"USA","website":"http://www.nycfirst.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-04-06T00:00:00","dateEnd":"2017-04-09T23:59:59"},{"code":"NYRO","divisionCode":null,"name":"Finger Lakes Regional ","type":"Regional","districtCode":null,"venue":"Gordon Field House","address":"Rochester Institute of Technology 149 Lomb Memorial Drive","city":"Rochester","stateprov":"NY","country":"USA","website":"http://upstatenyfirst.org/","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-15T00:00:00","dateEnd":"2017-03-18T23:59:59"},{"code":"NYSU","divisionCode":null,"name":"Hudson Valley Regional","type":"Regional","districtCode":null,"venue":"Rockland Community College - Athletic Center","address":"145 College Road","city":"Suffern","stateprov":"NY","country":"USA","website":"http://www.nycfirst.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-23T00:00:00","dateEnd":"2017-03-26T23:59:59"},{"code":"NYTR","divisionCode":null,"name":"New York Tech Valley Regional","type":"Regional","districtCode":null,"venue":"Rensselaer Polytechnic Institute","address":"ECAV Arena Peoples Drive","city":"Troy","stateprov":"NY","country":"USA","website":"http://www.techvalleyfirst.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-15T00:00:00","dateEnd":"2017-03-18T23:59:59"},{"code":"OHCL","divisionCode":null,"name":"Buckeye Regional","type":"Regional","districtCode":null,"venue":"Cleveland State University - Wolstein Center","address":"2000 Prospect Street","city":"Cleveland","stateprov":"OH","country":"USA","website":"http://www.firstbuckeye.org/","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-29T00:00:00","dateEnd":"2017-04-01T23:59:59"},{"code":"OHSP","divisionCode":null,"name":"Miami Valley Regional","type":"Regional","districtCode":null,"venue":"Wittenberg University","address":"200 W. Ward Street","city":"Springfield","stateprov":"OH","country":"USA","website":null,"webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-08T00:00:00","dateEnd":"2017-03-11T23:59:59"},{"code":"OKOK","divisionCode":null,"name":"Oklahoma Regional ","type":"Regional","districtCode":null,"venue":"Cox Arena - SMG Convention Center","address":"One Myriad Gardens","city":"Oklahoma City","stateprov":"OK","country":"USA","website":"http://first-oklahoma.com/","webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-03-22T00:00:00","dateEnd":"2017-03-25T23:59:59"},{"code":"ONBAR","divisionCode":null,"name":"ONT District - Georgian College Event","type":"DistrictEvent","districtCode":"ONT","venue":"Georgian College - Athletic Fitness Centre","address":"1 Georgian Drive","city":"Barrie","stateprov":"ON","country":"Canada","website":"http://www.firstroboticscanada.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-24T00:00:00","dateEnd":"2017-03-26T23:59:59"},{"code":"ONCMP","divisionCode":null,"name":"FIRST Ontario Provincial Championship","type":"DistrictChampionship","districtCode":"ONT","venue":"Hershey Centre","address":"5500 Rose Cherry Place","city":"Mississauga","stateprov":"ON","country":"Canada","website":"http://www.firstroboticscanada.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-04-12T00:00:00","dateEnd":"2017-04-15T23:59:59"},{"code":"ONHA2","divisionCode":null,"name":"STEMley Cup","type":"OffSeasonWithAzureSync","districtCode":null,"venue":"St. Mary Catholic Secondary School ","address":"200 Whitney Ave","city":"Hamilton","stateprov":"ON","country":"USA","website":"https://stemleycup.wordpress.com/","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-11-11T00:00:00","dateEnd":"2017-11-11T23:59:59"},{"code":"ONHAM","divisionCode":null,"name":"ONT District - McMaster University Event","type":"DistrictEvent","districtCode":"ONT","venue":"McMaster University","address":"1280 Main Street West","city":"Hamilton","stateprov":"ON","country":"Canada","website":"http://www.firstroboticscanada.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-04-07T00:00:00","dateEnd":"2017-04-09T23:59:59"},{"code":"ONLON","divisionCode":null,"name":"ONT District - Western University, Engineering Event","type":"DistrictEvent","districtCode":"ONT","venue":"Western University","address":"1151 Richmond Street","city":"London","stateprov":"ON","country":"Canada","website":"http://www.firstroboticscanada.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-31T00:00:00","dateEnd":"2017-04-02T23:59:59"},{"code":"ONNOB","divisionCode":null,"name":"ONT District - North Bay Event","type":"DistrictEvent","districtCode":"ONT","venue":"Nipissing University","address":"Robert J. Surtees Athletic Centre 100 College Drive","city":"North Bay","stateprov":"ON","country":"Canada","website":"http://www.firstroboticscanada.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-04-06T00:00:00","dateEnd":"2017-04-08T23:59:59"},{"code":"ONOSH","divisionCode":null,"name":"ONT District - Durham College Event","type":"DistrictEvent","districtCode":"ONT","venue":"Durham College","address":"Campus Wellness & Recreation Center 2000 Simcoe Street North","city":"Oshawa","stateprov":"ON","country":"Canada","website":"http://www.firstroboticscanada.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-03T00:00:00","dateEnd":"2017-03-05T23:59:59"},{"code":"ONTO1","divisionCode":null,"name":"ONT District - Ryerson University Event","type":"DistrictEvent","districtCode":"ONT","venue":"Ryerson University","address":"Mattamy Athletic Centre 50 Carlton Street","city":"Toronto","stateprov":"ON","country":"Canada","website":"http://www.firstroboticscanada.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-10T00:00:00","dateEnd":"2017-03-12T23:59:59"},{"code":"ONTO2","divisionCode":null,"name":"ONT District - Victoria Park Collegiate Event","type":"DistrictEvent","districtCode":"ONT","venue":"Victoria Park Collegiate","address":"15 Wallingford Road","city":"Toronto","stateprov":"ON","country":"Canada","website":"http://www.firstroboticscanada.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-17T00:00:00","dateEnd":"2017-03-19T23:59:59"},{"code":"ONWAT","divisionCode":null,"name":"ONT District - University of Waterloo Event","type":"DistrictEvent","districtCode":"ONT","venue":"University of Waterloo","address":"Physical Activities Complex 200 University Avenue West","city":"Waterloo","stateprov":"ON","country":"Canada","website":"http://www.firstroboticscanada.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-23T00:00:00","dateEnd":"2017-03-25T23:59:59"},{"code":"ONWIN","divisionCode":null,"name":"ONT District - Windsor Essex Great Lakes Event","type":"DistrictEvent","districtCode":"ONT","venue":"University of Windsor","address":"St. Denis Centre 2555 College Avenue","city":"Windsor","stateprov":"ON","country":"Canada","website":"http://www.firstroboticscanada.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-30T00:00:00","dateEnd":"2017-04-01T23:59:59"},{"code":"ORLAK","divisionCode":null,"name":"PNW District - Lake Oswego Event","type":"DistrictEvent","districtCode":"PNW","venue":"Lake Oswego High School","address":"2501 Country Club Rd","city":"Lake Oswego","stateprov":"OR","country":"USA","website":"http://www.firstwa.org","webcasts":[],"timezone":"Pacific Standard Time","dateStart":"2017-03-30T00:00:00","dateEnd":"2017-04-01T23:59:59"},{"code":"ORORE","divisionCode":null,"name":"PNW District - Clackamas Academy of Industrial Science Event","type":"DistrictEvent","districtCode":"PNW","venue":"Clackamas Academy","address":"1306 12th Street","city":"Oregon City","stateprov":"OR","country":"USA","website":"http://www.firstwa.org/","webcasts":[],"timezone":"Pacific Standard Time","dateStart":"2017-03-23T00:00:00","dateEnd":"2017-03-25T23:59:59"},{"code":"ORWIL","divisionCode":null,"name":"PNW District - Wilsonville Event","type":"DistrictEvent","districtCode":"PNW","venue":"Wilsonville High School","address":"6800 SW Wilsonville Road","city":"Wilsonville","stateprov":"OR","country":"USA","website":"http://oregonfirst.org/","webcasts":[],"timezone":"Pacific Standard Time","dateStart":"2017-03-09T00:00:00","dateEnd":"2017-03-11T23:59:59"},{"code":"PACA","divisionCode":null,"name":"Greater Pittsburgh Regional","type":"Regional","districtCode":null,"venue":"Convocation Center at","address":"California University of Pennsylvania  Riverview Drive","city":"California","stateprov":"PA","country":"USA","website":"http://www.pittsburghfirst.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-15T00:00:00","dateEnd":"2017-03-18T23:59:59"},{"code":"PAHAT","divisionCode":null,"name":"MAR District - Hatboro-Horsham Event","type":"DistrictEvent","districtCode":"MAR","venue":"Hatboro-Horsham High School","address":"899 Horsham Road","city":"Horsham","stateprov":"PA","country":"USA","website":"http://www.midatlanticrobotics.com/","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-03T00:00:00","dateEnd":"2017-03-05T23:59:59"},{"code":"PAPHI","divisionCode":null,"name":"MAR District - Springside Chestnut Hill Academy Event","type":"DistrictEvent","districtCode":"MAR","venue":"Springside Chestnut Hill Academy","address":"500 West Willow Grove Avenue","city":"Philadelphia","stateprov":"PA","country":"USA","website":"http://www.midatlanticrobotics.com/","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-17T00:00:00","dateEnd":"2017-03-19T23:59:59"},{"code":"PAWCH","divisionCode":null,"name":"MAR District - Westtown Event","type":"DistrictEvent","districtCode":"MAR","venue":"Westtown School","address":"975 Westtown Road","city":"West Chester","stateprov":"PA","country":"USA","website":"http://www.midatlanticrobotics.com","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-10T00:00:00","dateEnd":"2017-03-12T23:59:59"},{"code":"PNCMP","divisionCode":null,"name":"Pacific Northwest District Championship","type":"DistrictChampionship","districtCode":"PNW","venue":"Eastern Washington University - Reese Court","address":"526 5th Street","city":"Cheney","stateprov":"WA","country":"USA","website":"http://www.firstwa.org","webcasts":[],"timezone":"Pacific Standard Time","dateStart":"2017-04-05T00:00:00","dateEnd":"2017-04-08T23:59:59"},{"code":"QCMO","divisionCode":null,"name":"Festival de Robotique - Montreal Regional","type":"Regional","districtCode":null,"venue":"Centre Claude-Robillard","address":"1000 Avenue Emile-Journault","city":"Montreal","stateprov":"QC","country":"Canada","website":"http://www.robotiquefirstquebec.org/","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-22T00:00:00","dateEnd":"2017-03-25T23:59:59"},{"code":"R2OC","divisionCode":null,"name":"Rock River Off-Season Competition","type":"OffSeasonWithAzureSync","districtCode":null,"venue":"Rock Valley College Physical Education Center","address":"3301 North Mulford Road","city":"Rockford","stateprov":"IL","country":"USA","website":"http://r2oc.org/","webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-07-29T00:00:00","dateEnd":"2017-07-29T23:59:59"},{"code":"RIPRO","divisionCode":null,"name":"NE District - Rhode Island Event","type":"DistrictEvent","districtCode":"NE","venue":"Bryant University","address":"1150 Douglas Pike","city":"Smithfield","stateprov":"RI","country":"USA","website":"http://www.nefirst.org/","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-24T00:00:00","dateEnd":"2017-03-26T23:59:59"},{"code":"ROEBLING","divisionCode":"GARO","name":"FIRST Championship - Houston - Roebling Subdivision","type":"ChampionshipSubdivision","districtCode":null,"venue":"George R. Brown Convention Center","address":"1001 Avenida De Las Americas","city":"Houston","stateprov":"TX","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-04-19T00:00:00","dateEnd":"2017-04-22T23:59:59"},{"code":"SCMB","divisionCode":null,"name":"Palmetto Regional","type":"Regional","districtCode":null,"venue":"Myrtle Beach Convention Center","address":"2101 Oak Street","city":"Myrtle Beach","stateprov":"SC","country":"USA","website":"http://www.myrtlebeachfirstrobotics.com","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-01T00:00:00","dateEnd":"2017-03-04T23:59:59"},{"code":"TESLA","divisionCode":"CATE","name":"FIRST Championship - St. Louis - Tesla Subdivision","type":"ChampionshipSubdivision","districtCode":null,"venue":"America's Center/Dome","address":"901 N Broadway","city":"St. Louis","stateprov":"MO","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-04-26T00:00:00","dateEnd":"2017-04-29T23:59:59"},{"code":"TNKN","divisionCode":null,"name":"Smoky Mountains Regional","type":"Regional","districtCode":null,"venue":"Thompson-Boling Arena - University of Tennessee","address":"1600 Phillip Fulmer Way #202","city":"Knoxville","stateprov":"TN","country":"USA","website":"http://tnfirst.org/events/","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-22T00:00:00","dateEnd":"2017-03-25T23:59:59"},{"code":"TURING","divisionCode":"HOTU","name":"FIRST Championship - Houston - Turing Subdivision","type":"ChampionshipSubdivision","districtCode":null,"venue":"George R. Brown Convention Center","address":"1001 Avenida De Las Americas","city":"Houston","stateprov":"TX","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-04-19T00:00:00","dateEnd":"2017-04-22T23:59:59"},{"code":"TXDA","divisionCode":null,"name":"Dallas Regional","type":"Regional","districtCode":null,"venue":"Irving Convention Center","address":"500 West Las Colinas Boulevard","city":"Irving","stateprov":"TX","country":"USA","website":"http://www.DallasFRC.org/","webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-03-08T00:00:00","dateEnd":"2017-03-11T23:59:59"},{"code":"TXHO","divisionCode":null,"name":"Lone Star Central Regional","type":"Regional","districtCode":null,"venue":"Strake Jesuit College Preparatory","address":"8900 Bellaire Blvd","city":"Houston","stateprov":"TX","country":"USA","website":"http://houston.txfirst.org","webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-03-15T00:00:00","dateEnd":"2017-03-18T23:59:59"},{"code":"TXLU","divisionCode":null,"name":"Hub City Regional","type":"Regional","districtCode":null,"venue":"Panhandle South Plains Fair","address":"105 E. Broadway","city":"Lubbock","stateprov":"TX","country":"USA","website":"http://hubcityregional.com","webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-03-01T00:00:00","dateEnd":"2017-03-04T23:59:59"},{"code":"TXRI","divisionCode":null,"name":"Texas Robotics Invitational","type":"OffSeasonWithAzureSync","districtCode":null,"venue":"Strake Jesuit College Prep","address":"8900 Bellaire Blvd","city":"Houston","stateprov":"TX","country":"USA","website":"http://www.spectrum3847.org/TRI","webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-07-01T00:00:00","dateEnd":"2017-07-01T23:59:59"},{"code":"TXRR","divisionCode":null,"name":"Texas Robot Roundup","type":"OffSeasonWithAzureSync","districtCode":null,"venue":"Vandegrift High School","address":"9500 McNeil Dr","city":"Austin","stateprov":"TX","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-07-28T00:00:00","dateEnd":"2017-07-29T23:59:59"},{"code":"TXSA","divisionCode":null,"name":"Alamo Regional","type":"Regional","districtCode":null,"venue":"Henry B. Gonzalez Convention Center","address":"200 East Market Street","city":"San Antonio","stateprov":"TX","country":"USA","website":"http://www.alamo-first.org","webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-04-05T00:00:00","dateEnd":"2017-04-08T23:59:59"},{"code":"TXTR","divisionCode":null,"name":"The Remix","type":"OffSeasonWithAzureSync","districtCode":null,"venue":"College Park HS","address":"3701 College Park Dr","city":"The Woodlands","stateprov":"TX","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-11-11T00:00:00","dateEnd":"2017-11-11T23:59:59"},{"code":"TXWA","divisionCode":null,"name":"Brazos Valley Regional","type":"Regional","districtCode":null,"venue":"University High School","address":"3201 S. New Road","city":"Waco","stateprov":"TX","country":"USA","website":"http://firstintexas.org/regions/alamo-region/brazos-valley-frc-regional/","webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-03-30T00:00:00","dateEnd":"2017-04-02T23:59:59"},{"code":"TXWO","divisionCode":null,"name":"Lone Star North Regional","type":"Regional","districtCode":null,"venue":"College Park High School","address":"3701 College Park Drive","city":"The Woodlands","stateprov":"TX","country":"USA","website":"http://houston.txfirst.org","webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-03-30T00:00:00","dateEnd":"2017-04-02T23:59:59"},{"code":"UTWV","divisionCode":null,"name":"Utah Regional","type":"Regional","districtCode":null,"venue":"Maverik Center","address":"3200 South Decker Lake Drive","city":"West Valley City","stateprov":"UT","country":"USA","website":"http://www.utfrc.utah.edu","webcasts":[],"timezone":"Mountain Standard Time","dateStart":"2017-03-08T00:00:00","dateEnd":"2017-03-11T23:59:59"},{"code":"VABLA","divisionCode":null,"name":"CHS District - Southwest Virginia Event","type":"DistrictEvent","districtCode":"CHS","venue":"Blacksburg High School","address":"3401 Bruin Lane","city":"Blacksburg","stateprov":"VA","country":"USA","website":"http://www.firstchesapeake.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-03T00:00:00","dateEnd":"2017-03-05T23:59:59"},{"code":"VAGLE","divisionCode":null,"name":"CHS District - Central Virginia Event","type":"DistrictEvent","districtCode":"CHS","venue":"Deep Run High School","address":"4801 Twin Hickory Road","city":"Glen Allen","stateprov":"VA","country":"USA","website":"http://www.firstchesapeake.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-24T00:00:00","dateEnd":"2017-03-26T23:59:59"},{"code":"VAHAY","divisionCode":null,"name":"CHS District - Northern Virginia Event sponsored by Bechtel","type":"DistrictEvent","districtCode":"CHS","venue":"Battlefield High School","address":"15000 Graduation Drive","city":"Haymarket","stateprov":"VA","country":"USA","website":"http://www.firstchesapeake.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-03T00:00:00","dateEnd":"2017-03-05T23:59:59"},{"code":"VAPOR","divisionCode":null,"name":"CHS District - Hampton Roads Event sponsored by Newport News Shipbuilding","type":"DistrictEvent","districtCode":"CHS","venue":"Churchland High School","address":"4301 Cedar Lane","city":"Portsmouth","stateprov":"VA","country":"USA","website":"http://www.firstchesapeake.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-03-17T00:00:00","dateEnd":"2017-03-19T23:59:59"},{"code":"WAAHS","divisionCode":null,"name":"PNW District - Auburn Event","type":"DistrictEvent","districtCode":"PNW","venue":"Auburn High School","address":"711 E. Main St.","city":"Auburn","stateprov":"WA","country":"USA","website":"http://www.firstwa.org","webcasts":[],"timezone":"Pacific Standard Time","dateStart":"2017-03-31T00:00:00","dateEnd":"2017-04-02T23:59:59"},{"code":"WAAMV","divisionCode":null,"name":"PNW District - Auburn Mountainview Event","type":"DistrictEvent","districtCode":"PNW","venue":"Auburn Mountainview High School","address":"28900 124th Avenue SE","city":"Auburn","stateprov":"WA","country":"USA","website":"http://www.firstwa.org/","webcasts":[],"timezone":"Pacific Standard Time","dateStart":"2017-03-03T00:00:00","dateEnd":"2017-03-05T23:59:59"},{"code":"WAELL","divisionCode":null,"name":"PNW District - Central Washington University Event","type":"DistrictEvent","districtCode":"PNW","venue":"Central Washington University - Nicholson Pavilion","address":"715 E. Dean Nicholson Blvd","city":"Ellensburg","stateprov":"WA","country":"USA","website":"http://www.firstwa.org","webcasts":[],"timezone":"Pacific Standard Time","dateStart":"2017-03-16T00:00:00","dateEnd":"2017-03-18T23:59:59"},{"code":"WAGG","divisionCode":null,"name":"Washington Girls Generation","type":"OffSeasonWithAzureSync","districtCode":null,"venue":"Maple View Middle School","address":"18200 SE 240th ST","city":"Kent","stateprov":"WA","country":"USA","website":null,"webcasts":[],"timezone":"Pacific Standard Time","dateStart":"2017-10-28T00:00:00","dateEnd":"2017-10-28T23:59:59"},{"code":"WAMOU","divisionCode":null,"name":"PNW District - Mount Vernon Event","type":"DistrictEvent","districtCode":"PNW","venue":"Mount Vernon High School","address":"314 North 9th Street","city":"Mount Vernon","stateprov":"WA","country":"USA","website":"http://www.firstwa.org/","webcasts":[],"timezone":"Pacific Standard Time","dateStart":"2017-03-17T00:00:00","dateEnd":"2017-03-19T23:59:59"},{"code":"WAPP","divisionCode":null,"name":"Peak Performance","type":"OffSeasonWithAzureSync","districtCode":null,"venue":"Seattle Christian School","address":"18301 Military Rd S","city":"SeaTac","stateprov":"WA","country":"USA","website":"http://offseason.apexfrc.com/","webcasts":[],"timezone":"Pacific Standard Time","dateStart":"2017-09-23T00:00:00","dateEnd":"2017-09-23T23:59:59"},{"code":"WASNO","divisionCode":null,"name":"PNW District - Glacier Peak Event","type":"DistrictEvent","districtCode":"PNW","venue":"Glacier Peak High School","address":"7401 144th Place SE","city":"Snohomish","stateprov":"WA","country":"USA","website":"http://www.firstwa.org/","webcasts":[],"timezone":"Pacific Standard Time","dateStart":"2017-03-24T00:00:00","dateEnd":"2017-03-26T23:59:59"},{"code":"WASPO","divisionCode":null,"name":"PNW District - West Valley Event","type":"DistrictEvent","districtCode":"PNW","venue":"West Valley High School","address":"8301 E. Buckeye Avenue","city":"Spokane","stateprov":"WA","country":"USA","website":"http://www.firstwa.org","webcasts":[],"timezone":"Pacific Standard Time","dateStart":"2017-03-02T00:00:00","dateEnd":"2017-03-04T23:59:59"},{"code":"WEEK0","divisionCode":null,"name":"Week 0","type":"OffSeasonWithAzureSync","districtCode":null,"venue":"Bishop Guertin High School","address":"129 Almont Street","city":"Nashua","stateprov":"NH","country":"USA","website":"http://www.firstinspires.org","webcasts":[],"timezone":"Eastern Standard Time","dateStart":"2017-02-18T00:00:00","dateEnd":"2017-02-18T23:59:59"},{"code":"WILA","divisionCode":null,"name":"Seven Rivers Regional","type":"Regional","districtCode":null,"venue":"La Crosse Center","address":"300 Harborview Plaza","city":"La Crosse","stateprov":"WI","country":"USA","website":null,"webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-04-12T00:00:00","dateEnd":"2017-04-15T23:59:59"},{"code":"WIMI","divisionCode":null,"name":"Wisconsin Regional","type":"Regional","districtCode":null,"venue":"UW - Milwaukee Panther Arena","address":"400 West Kilbourn Avenue","city":"Milwaukee","stateprov":"WI","country":"USA","website":"http://www.wisconsinregional.com","webcasts":[],"timezone":"Central Standard Time","dateStart":"2017-03-22T00:00:00","dateEnd":"2017-03-25T23:59:59"}],"eventCount":196}`);
var hallOfFame = JSON.parse('[{"Year":1992,"Chairmans":191,"Challenge":"Maize Craize","Winner1":126,"Winner2":null,"Winner3":null,"Winner4":null,"Winner5":null},{"Year":1993,"Chairmans":7,"Challenge":"Rug Rage","Winner1":148,"Winner2":null,"Winner3":null,"Winner4":null,"Winner5":null},{"Year":1994,"Chairmans":191,"Challenge":"Tower Power ","Winner1":144,"Winner2":null,"Winner3":null,"Winner4":null,"Winner5":null},{"Year":1995,"Chairmans":151,"Challenge":"Ramp-n-Roll","Winner1":100,"Winner2":null,"Winner3":null,"Winner4":null,"Winner5":null},{"Year":1996,"Chairmans":144,"Challenge":"Hexagon Havoc","Winner1":73,"Winner2":null,"Winner3":null,"Winner4":null,"Winner5":null},{"Year":1997,"Chairmans":47,"Challenge":"Toroid Terror","Winner1":71,"Winner2":null,"Winner3":null,"Winner4":null,"Winner5":null},{"Year":1998,"Chairmans":23,"Challenge":"Ladder Logic","Winner1":45,"Winner2":null,"Winner3":null,"Winner4":null,"Winner5":null},{"Year":1999,"Chairmans":120,"Challenge":"Double Trouble","Winner1":1,"Winner2":48,"Winner3":176,"Winner4":null,"Winner5":null},{"Year":2000,"Chairmans":16,"Challenge":"Co-Opertition FIRST","Winner1":25,"Winner2":232,"Winner3":255,"Winner4":null,"Winner5":null},{"Year":2001,"Chairmans":22,"Challenge":"Diabolical Dynamics","Winner1":71,"Winner2":125,"Winner3":279,"Winner4":294,"Winner5":365},{"Year":2002,"Chairmans":175,"Challenge":"Zone Zeal","Winner1":66,"Winner2":71,"Winner3":173,"Winner4":null,"Winner5":null},{"Year":2003,"Chairmans":103,"Challenge":"Stack Attack","Winner1":65,"Winner2":111,"Winner3":469,"Winner4":null,"Winner5":null},{"Year":2004,"Chairmans":254,"Challenge":"FIRST Frenzy - Raising the Bar","Winner1":71,"Winner2":435,"Winner3":494,"Winner4":null,"Winner5":null},{"Year":2005,"Chairmans":67,"Challenge":"Triple Play","Winner1":330,"Winner2":67,"Winner3":503,"Winner4":null,"Winner5":null},{"Year":2006,"Chairmans":111,"Challenge":"Aim High","Winner1":217,"Winner2":296,"Winner3":522,"Winner4":null,"Winner5":null},{"Year":2007,"Chairmans":365,"Challenge":"Rack-n-Roll","Winner1":177,"Winner2":190,"Winner3":987,"Winner4":null,"Winner5":null},{"Year":2008,"Chairmans":842,"Challenge":"FIRST Overdrive","Winner1":1114,"Winner2":217,"Winner3":148,"Winner4":null,"Winner5":null},{"Year":2009,"Chairmans":236,"Challenge":"Lunacy","Winner1":111,"Winner2":67,"Winner3":971,"Winner4":null,"Winner5":null},{"Year":2010,"Chairmans":341,"Challenge":"Breakaway!","Winner1":294,"Winner2":67,"Winner3":177,"Winner4":null,"Winner5":null},{"Year":2011,"Chairmans":359,"Challenge":"LogoMotion","Winner1":254,"Winner2":111,"Winner3":973,"Winner4":null,"Winner5":null},{"Year":2012,"Chairmans":1114,"Challenge":"Rebound Rumble","Winner1":180,"Winner2":16,"Winner3":25,"Winner4":null,"Winner5":null},{"Year":2013,"Chairmans":1538,"Challenge":"ULTIMATE ASCENT","Winner1":1241,"Winner2":1477,"Winner3":610,"Winner4":null,"Winner5":null},{"Year":2014,"Chairmans":27,"Challenge":"Arial Assist","Winner1":254,"Winner2":469,"Winner3":2848,"Winner4":74,"Winner5":null},{"Year":2015,"Chairmans":597,"Challenge":"Recycle Rush","Winner1":118,"Winner2":1671,"Winner3":1678,"Winner4":5012,"Winner5":null},{"Year":2016,"Chairmans":987,"Challenge":"FIRST Stronghold","Winner1":330,"Winner2":2481,"Winner3":120,"Winner4":1086,"Winner5":null},{"Year":2017,"Chairmans":3132,"Challenge":"STEAMworks Houston","Winner1":973,"Winner2":1011,"Winner3":2928,"Winner4":5499,"Winner5":null},{"Year":2017,"Chairmans":2614,"Challenge":"STEAMworks StLouis","Winner1":2767,"Winner2":254,"Winner3":862,"Winner4":1676,"Winner5":null},{"Year":2017,"Chairmans":null,"Challenge":"Festival of Champions","Winner1":2767,"Winner2":254,"Winner3":862,"Winner4":1676,"Winner5":null}]');

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
var haveRanks = false;
var highScores = {};
var currentEventList = [];
var lastRanksUpdate = "";
var haveSchedule = false;

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

//this heartbeat checks the world high scores every 5 minutes.
//var highScoresTimer = setInterval(function () {
//    "use strict";
//    getSeasonHighScores(2018);
//}, 300000);

//Championship events receive special treatment. We define the Championshio events here, including Michigan.
var champSubdivisions = ["ARCHIMEDES", "CARSON", "CARVER", "CURIE", "DALY", "DARWIN", "GALILEO", "HOPPER", "NEWTON", "ROEBLING", "TESLA", "TURING"];
var champDivisions = ["ARDA", "CANE", "CATE", "CUDA", "GARO", "HOTU"];
var champs = ["CMP", "CMPTX", "CMPMO", "CMPMI"];
var miDivisions = ["MICMP1", "MICMP2", "MICMP3", "MICMP4"];
var miChamps = ["MICMP"];

//The apiURL determines the endpoint for API calls. On the web, it's the site itself. In the mobile app, we need to declare the complete API URL.
var apiURL = "/api/";
//var apiURL = "https://gatool.jameslockman.com/api/";

//Now that we have the variables all set up and all of the necessary JS and CSS are loaded, we can run the app.
window.onload = function () {
	"use strict";

	//hide the schedule progress bar. We'll show it if we need it.
	$('#scheduleProgressBar').hide();

	//change the Select Picker behavior to support Mobile browsers with native controls
	//if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
	//        $('.selectpicker').selectpicker('mobile');
	//    }

	$("#loadingFeedback").html("Restoring settings...");
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

	//Set Event Filter values
	$("#eventFilters").selectpicker('val', JSON.parse(localStorage.eventFilters));


	$("#loadingFeedback").html("Enabling controls...");

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
		displayAwards();

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
		displayAwards();
	};

	//Handle a change in Event Name Display
	document.getElementById('showEventNames').onchange = function () {
		if ($("#showEventNames").bootstrapSwitch('state')) {
			localStorage.showEventNames = "true";
		} else {
			localStorage.showEventNames = "false";
		}
		displayAwards();
	};

	// Handle showEventNames toggle in loading. 
	if ($("#showEventNames").bootstrapSwitch('state')) {
		localStorage.showEventNames = "true";
	} else {
		localStorage.showEventNames = "false";
	}

	//Handle Event Filter change
	document.getElementById('eventFilters').onchange = function () {
		filterEvents();

	};

	$("#loadingFeedback").html("Setting up offseason mode...");
	//Setup the Offseason schedule upload and reset buttons. See their respective fuctions for details.
	document.getElementById("QualsFiles").addEventListener('change', handleQualsFiles, false);
	document.getElementById("PlayoffFiles").addEventListener('change', handlePlayoffFiles, false);

	document.getElementById("QualsFilesReset").addEventListener('click', handleQualsFilesReset, false);
	document.getElementById("PlayoffFilesReset").addEventListener('click', handlePlayoffFilesReset, false);

	//setup the Offseason Tab
	$('#offseasonTeamListToJSON').click(function () {
		//Example: var parseOutput = CSVParser.parse(this.inputText, this.headersProvided, this.delimiter, this.downcaseHeaders, this.upcaseHeaders);
		//console.log("starting conversion");
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
	$('#cheatSheetImage').html('<img src="images/Power-Up-Cheatsheet-gatool.png" width="100%" alt="Steamworks Cheatsheet">');
	$('#allianceSelectionTable').hide();
	$('#allianceUndoButton').hide();

	//Load the events list based on the restored values
	loadEventsList();

	scaleRows();
	document.getElementById('setupTabPicker').click();
	$("#loadingFeedback").html("gatool ready to play!");
	$("#loadingFeedback").fadeOut();

};

window.addEventListener("resize", scaleRows);

function getSeasonHighScores(year) {
	"use strict";
	var promises = [];
	if (year === 2018) {
		for (var i = 0; i < currentEventList.length; i++) {
			promises.push(new Promise(function (resolve, reject) {
				getEventScores(currentEventList[i].code, currentEventList[i].type, year, "qual");
			}));
			promises.push(new Promise(function (resolve, reject) {
				getEventScores(currentEventList[i].code, currentEventList[i].type, year, "playoff");
			}));
		}
		Promise.all(promises);
	}
}

function getEventScores(eventCode, type, year, tlevel) {
	"use strict";
	return new Promise(function (resolve, reject) {

		var req = new XMLHttpRequest();
		req.open('GET', apiURL + year + '/schedule/' + eventCode + "/" + tlevel + "?returnschedule=false");
		req.addEventListener('load', function () {
			resolve(JSON.parse(req.responseText));
		});
		req.send();
	});
}



function displayAwards() {
	"use strict";
	//Handle awardSeparator value
	$(".awardsSeparator1,.awardsSeparator2,.awardsSeparator3").hide();
	if (localStorage.awardSeparator === " || ") {
		$(".awardsSeparator1").show();
	} else if (localStorage.awardSeparator === " // ") {
		$(".awardsSeparator2").show();
	} else if (localStorage.awardSeparator === "<br>") {
		$(".awardsSeparator3").show();
	} else {
		$(".awardsSeparator3").show();
	}

	//Handle awardDepth value
	$(".awardsDepth1,.awardsDepth2,.awardsDepth3").show();
	$(".lastAward1,.lastAward2,.lastAward3").hide();
	if (localStorage.awardDepth === "1") {
		$(".awardsDepth2,.awardsDepth3").hide();
	} else if (localStorage.awardDepth === "2") {
		$(".awardsDepth3").hide();
		$(".lastAward1").show();
	} else {
		$(".lastAward1,.lastAward2").show();
	}

	//Handle Event Names switch
	if (localStorage.showEventNames === "true") {
		$(".awardsEventName").show();
		$(".awardsEventCode").hide();
	} else {
		$(".awardsEventName").hide();
		$(".awardsEventCode").show();
	}

}

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
	haveRanks = false;
	haveSchedule = false;
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
	haveRanks = false;
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
	localStorage.highScoreDetails = "{}";
	$("#eventName").html("<b>" + JSON.parse(document.getElementById("eventSelector").value).name + "</b>");
	$("#eventNameAllianceSelection").html("<b>" + localStorage.eventName + " </b>");
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
	localStorage.highScoreDetails = "{}";
	$("#eventName").html("<b>" + JSON.parse(document.getElementById("eventSelector").value).name + "</b>");
	$("#eventNameAllianceSelection").html("<b>" + localStorage.eventName + "<br>");
	$("#eventNameAwards").html("<b>" + localStorage.eventName + "</b><br>");
}


function loadEventsList() {
	"use strict";
	var e = document.getElementById('yearPicker');
	localStorage.currentYear = e.options[e.selectedIndex].value;
	$("#eventUpdateContainer").html("Loading event list...");
	var req = new XMLHttpRequest();
	//req.responseType = 'json';
	var endpoint = "/events";
	if (localStorage.offseason === "true") {
		endpoint = "/offseasoneventsv2";
	}
	req.open('GET', apiURL + localStorage.currentYear + endpoint);
	req.addEventListener('load', function () {
		localStorage.currentEventList = JSON.stringify(JSON.parse(req.responseText).Events);
		currentEventList = JSON.parse(req.responseText).Events;
		createEventMenu();
		filterEvents();

	});
	req.send();
}

function filterEvents() {
	"use strict";
	var filterClasses = "";
	var previousFilters = JSON.parse(localStorage.eventFilters);

	if (!$("#offseason").bootstrapSwitch('state')) {
		$(".eventsfilter").hide();
		var filters = $("#eventFilters").selectpicker('val');
		if (filters.indexOf("clear") >= 0 || filters.length === 0) {
			$("#eventFilters").selectpicker('deselectAll');
			$(".eventsfilter").show();
		} else {
			if (filters.indexOf("past") >= 0) {
				if (previousFilters.indexOf("future") >= 0) {
					filters.splice(filters.indexOf("future"), 1);
				}
			}

			if (filters.indexOf("future") >= 0) {
				if (previousFilters.indexOf("past") >= 0) {
					filters.splice(filters.indexOf("past"), 1);
				}
			}

			filterClasses = ".filters" + filters[0];
			if (filters.length > 1) {
				for (var i = 1; i < filters.length; i++) {
					filterClasses += ".filters" + filters[i];
				}
			}
			$("#eventFilters").selectpicker('val', filters);
			$(filterClasses).show();
		}
		localStorage.eventFilters = JSON.stringify($("#eventFilters").selectpicker('val'));
	}
}

function createEventMenu() {
	"use strict";
	var tmp = currentEventList;
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
		var optionFilter = "";
		var timeNow = moment();
		var eventTime = moment(option.value.dateEnd);
		if (option.value.type === "OffSeasonWithAzureSync") {
			optionClass = "bg-info";
			optionPrefix = "•• ";
			optionPostfix = " ••";
		}
		if (option.value.type.startsWith("Regional")) {
			optionFilter += " eventsfilter filtersregional";
		} else if (option.value.type.startsWith("Champion")) {
			optionFilter += " eventsfilter filterschamps";
		} else if (option.value.type.startsWith("OffSeason")) {
			optionFilter += " eventsfilter filtersoffseason";
		} else if (option.value.type.startsWith("District")) {
			optionFilter += " eventsfilter filters" + option.value.districtCode;
		}
		if (timeNow.diff(eventTime) < 0) {
			optionFilter += " filtersfuture";
		} else {
			optionFilter += " filterspast";
		}

		sel.append($('<option></option>')
			.attr({
				'value': JSON.stringify(option.value),
				'class': optionClass + optionFilter,
				'id': 'eventSelector' + option.value.code
			}).text(optionPrefix + option.text + optionPostfix));
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
	req.open('GET', apiURL + localStorage.currentYear + '/schedule/' + localStorage.currentEvent + '/qual?returnschedule=true');
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
			haveSchedule = true;

			//patch for missing scores
			//$("#allianceSelectionPlaceholder").hide();
			//$("#allianceSelectionTable").show();

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
	req1.open('GET', apiURL + localStorage.currentYear + '/schedule/' + localStorage.currentEvent + '/playoff?returnschedule=true');
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

			//patch for missing scores
			$("#allianceSelectionPlaceholder").hide();
			$("#allianceSelectionTable").show();

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
		if (matchSchedule) {
			announceDisplay();
		}

	});

	// Special case to support Championship Playoffs (Einstein and Michigan)
	var reqChamps = new XMLHttpRequest();
	reqChamps.open('GET', apiURL + localStorage.currentYear + '/schedule/' + localStorage.currentEvent + '/playoff?returnschedule=true');
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

function updateTeamTable() {
	"use strict";
	var teamData = eventTeamList.slice(0);
	$("#teamsTableBody").empty();
	for (var i = 0; i < teamData.length; i++) {
		var element = teamData[i];
		$('#teamsTableBody').append(updateTeamTableRow(element));
	}
	if (haveSchedule) {
		announceDisplay();
	}

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
		if (pageNumber === 1) {
			$("#teamsTableBody").empty();
		}
		if (req.responseText.includes('"teams":')) {
			data = JSON.parse(req.responseText);
		} else {
			data = JSON.parse('{"teams":[],"teamCountTotal":0,"teamCountPage":0,"pageCurrent":0,"pageTotal":0}');
		}
		if (data.teams.length === 0 && pageNumber === 1) {
			$('#teamsTableEventName').html('Event team list unavailable.');
			$("#eventTeamCount").html(data.teamCountTotal);
			teamCountTotal = data.teamCountTotal;
			localStorage.teamList = "";
		} else {
			if (pageNumber === 1) {
				$("#eventTeamCount").html(data.teamCountTotal);
				//teamCountTotal = data.teamCountTotal * $('#awardDepthPicker').val();
				teamCountTotal = data.teamCountTotal;
				$('#teamsTableEventName').html(localStorage.eventName);
			}

			for (var i = 0; i < data.teams.length; i++) {
				var element = data.teams[i];
				$('#teamsTableBody').append(generateTeamTableRow(element));
				eventTeamList.push(data.teams[i]);
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
				//team.lastVisit = "No recent visit";

				localStorage['teamData' + eventTeamList[j].teamNumber] = JSON.stringify(team);
				highScores['"' + eventTeamList[j].teamNumber + '.score"'] = 0;
				highScores['"' + eventTeamList[j].teamNumber + '.description"'] = "";
			}

			if (data.pageCurrent < data.pageTotal) {
				lastSchedulePage = false;
				getTeamList(year, parseInt(pageNumber) + 1);
			} else {
				localStorage.teamList = JSON.stringify(eventTeamList);
				getTeamAwardsAsync(eventTeamList, year);
				if (localStorage.currentYear === "2018") {
					getAvatars();
				}
				getHybridSchedule();
				displayAwardsTeams();
				lastSchedulePage = true;
			}
		}

		$("#teamUpdateContainer").html(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
	});
	req.send();

}

function getAvatars() {
	"use strict";
	var req = new XMLHttpRequest();
	req.open('GET', apiURL + localStorage.currentYear + '/avatars/' + localStorage.currentEvent);
	req.addEventListener('load', function () {
		var data = JSON.parse(req.responseText);
		var teamData = {};
		for (var i = 0; i < data.teams.length; i++) {
			if (typeof localStorage["teamData" + data.teams[i].teamNumber] !== "undefined") {
				teamData = JSON.parse(localStorage["teamData" + data.teams[i].teamNumber]);
				if (data.teams[i].encodedAvatar !== null) {
					teamData.avatar = data.teams[i].encodedAvatar;
					$("#avatar" + data.teams[i].teamNumber).html('<img src="' + data.teams[i].encodedAvatar + '">&nbsp;');
				} else {
					teamData.avatar = "null";
					$("#avatar" + data.teams[i].teamNumber).html("");
				}
				localStorage["teamData" + data.teams[i].teamNumber] = JSON.stringify(teamData);
			}

		}

	});
	req.send();
}

function getHighScores() {
	"use strict";
	var req = new XMLHttpRequest();
	var eventNames = JSON.parse(localStorage.events);
	req.open('GET', apiURL + localStorage.currentYear + '/highscore/');
	req.addEventListener('load', function () {
		var data = JSON.parse(req.responseText);
		$("#highscoreyear").html(" " + localStorage.currentYear);
		if (data.highQualsPenaltyFree.score) {
			$("#highQualsNoFouls").html("Qual (no fouls) " + data.highQualsPenaltyFree.score + " Match " + data.highQualsPenaltyFree.details.matchNumber + "<br>" + eventNames[data.highQualsPenaltyFree.event]);
		}
		if (data.highQualsPenaltyFreeOffsetting.score) {
			$("#highQualsOffsettingFouls").html("Qual (offsetting fouls) " + data.highQualsPenaltyFreeOffsetting.score + " Match " + data.highQualsPenaltyFreeOffsetting.details.matchNumber + "<br>" + eventNames[data.highQualsPenaltyFreeOffsetting.event]);
		}
		if (data.highQuals.score) {
			$("#highQuals").html("Qual " + data.highQuals.score + " Match " + data.highQuals.details.matchNumber + "<br>" + eventNames[data.highQuals.event]);
		}
		if (data.highPlayoffPenaltyFree.score) {
			$("#highPlayoffNoFouls").html("Playoff (no fouls) " + data.highPlayoffPenaltyFree.score + " Match " + data.highPlayoffPenaltyFree.details.matchNumber + "<br>" + eventNames[data.highPlayoffPenaltyFree.event]);
		}
		if (data.highPlayoffPenaltyFreeOffsetting.score) {
			$("#highPlayoffOffsettingFouls").html("Playoff (offsetting fouls) " + data.highPlayoffPenaltyFreeOffsetting.score + " Match " + data.highPlayoffPenaltyFreeOffsetting.details.matchNumber + "<br>" + eventNames[data.highPlayoffPenaltyFreeOffsetting.event]);
		}
		if (data.highPlayoff.score) {
			$("#highPlayoff").html("Playoff " + data.highPlayoff.score + " Match " + data.highPlayoff.details.matchNumber + "<br>" + eventNames[data.highPlayoff.event]);
		}

	});
	req.send();


}


function getTeamAwardsAsync(teamList, currentYear) {
	"use strict";
	var teamAwardRequests = [];
	teamList.forEach((item, index) => {
		teamAwardRequests.push(new Promise((resolve, reject) => {
			//console.log(item.teamNumber);
			getTeamAwards(item.teamNumber, currentYear);
			resolve();
		}));
	});
	Promise.all(teamAwardRequests).then((value) => {
		//console.log('finished');
	});
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
		if (haveSchedule) {
			announceDisplay();
		}
		$("#allianceUpdateContainer").html(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
	});
	if (localStorage.inPlayoffs === "true") {
		req2.send();
	} else {
		if (haveSchedule) {
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
	$("#davidPrice").removeClass("redScore");
	$("#davidPrice").removeClass("blueScore");
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
		$("#davidPriceNumber").html(davidPriceFormat(parsePlayoffMatchName(currentMatchData.description)));

	} else {
		$("#matchNameAnnounce").html("<b>" + currentMatchData.description + " of " + qualsList.Schedule.length + "</b>");
		$("#topMatchNameAnnounce").html("<b>" + localStorage.eventName + "<br>" + currentMatchData.description + " of " + qualsList.Schedule.length + "</b>");
		$("#matchName").html("<b>" + currentMatchData.description + " of " + qualsList.Schedule.length + "</b>");
		$("#topMatchNamePlayByPlay").html("<b>" + currentMatchData.description + " of " + qualsList.Schedule.length + "</b>");
		$("#davidPriceNumber").html(davidPriceFormat(currentMatchData.description));
	}
	$("#eventHighScorePlayByPlay").html("<b>Current High Score: " + localStorage.matchHighScore + "<br>from " + localStorage.highScoreDetails + "</b>");
	getHighScores();

	function davidPriceFormat(MatchData) {
		var str = MatchData.split(" ", 4);
		MatchData = "";
		for (var i = 0; i < str.length; i++) {
			MatchData += str[i].replace("Qualification", "").replace("Quarterfinal", "Q").replace("Semifinal", "S").replace("Final", "F").replace("Match", "M").replace("Tiebreaker", "T");
		}
		return MatchData.trim();
	}

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
		inHallOfFame(currentMatchData.teams[ii].teamNumber, stationList[ii]);
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
			$("#" + stationList[ii] + "WinLossTie").html("<table class='wltTable'><tr><td id='" + stationList[ii] + "PlayByPlayRank' class='wltCol'>Rank " + teamData.rank + "<br>AV RP " + teamData.sortOrder1 + "</td><td class='wltCol'>Qual Avg<br>" + teamData.qualAverage + "</td><td class='wltCol'>W-L-T<br>" + teamData.wins + "-" + teamData.losses + "-" + teamData.ties + "</td></tr><tr><td colspan='3'>Team high score: " + highScores['"' + currentMatchData.teams[ii].teamNumber + '.score"'] + "<br>in " + highScores['"' + currentMatchData.teams[ii].teamNumber + '.description"'] + "</td></tr></table>");
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

	}
	displayAwards();
}

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
	var team = {};
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
				team = JSON.parse(localStorage['teamData' + teamList[j].teamNumber]);

				team.rank = "";
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
				$("#teamTableRank" + teamList[j].teamNumber).html("");
				$("#teamTableRank" + teamList[j].teamNumber).attr("class", teamTableRankHighlight(100));
				localStorage['teamData' + teamList[j].teamNumber] = JSON.stringify(team);
			}
		} else {
			haveRanks = true;
			localStorage.Rankings = JSON.stringify(data.Rankings);
			if (localStorage.currentMatch > JSON.parse(localStorage.qualsList).Schedule.length) {
				$("#rankingDisplay").html("<b>Qual Seed<b>");
			} else {
				$("#rankingDisplay").html('<b>Ranking</b>');
			}
			$('#ranksContainer').html('<p class = "eventName">' + localStorage.eventName + ' (<b><span id="rankstablelastupdated"></span></b>)</p><p>This table lists the teams in rank order for this competition. This table updates during the competition, and freezes once Playoff Matches begin. </p><table id="ranksTable" class="table table-condensed table-responsive table-bordered table-striped"></table>');
			var ranksList = '<thead  id="ranksTableHead" class="thead-default"><tr><td class="col1"><b>Team #</b></td><td class="col1"><b>Rank</b></td><td class="col2"><b>Team Name</b></td><td class = "col1"><b>RP Avg.</b></td><td class="col1"><b>Wins</b></td><td  class="col1"><b>Losses</b></td><td class="col1"><b>Ties</b></td><td class="col1"><b>Qual Avg</b></td><td class="col1"><b>DQ</b></td><td class="col1"><b>Matches Played</b></td></tr></thead><tbody>';

			for (var i = 0; i < data.Rankings.length; i++) {

				team = JSON.parse(localStorage['teamData' + data.Rankings[i].teamNumber]);

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

			}
			$("#ranksProgressBar").hide();
			$('#ranksTable').html(ranksList + "</tbody>");
			$('#teamRanksPicker').removeClass('alert-danger');
			$('#teamRanksPicker').addClass('alert-success');
			lastRanksUpdate = req.getResponseHeader("Last-Modified");

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
	var eventNames = [];
	eventNames[String(year)] = JSON.parse(localStorage.events);
	eventNames["2017"] = JSON.parse(localStorage.events2017);
	eventNames["2016"] = JSON.parse(localStorage.events2016);
	eventNames["2015"] = JSON.parse(localStorage.events2015);

	var teamData = JSON.parse(localStorage["teamData" + teamNumber]);

	var awardHilight = {
		"before": "<b>",
		"after": "</b>"
	};
	var awardName = "";

	var req = new XMLHttpRequest();
	req.open('GET', apiURL + year + '/awardsv2/' + teamNumber + "/");
	req.addEventListener('load', function () {
		teamLoadProgressBar++;
		$('#teamloadprogressbar').attr("style", "width:" + (teamLoadProgressBar / teamCountTotal * 100) + "%");
		$('#teamProgressBarLoading').attr("style", "width:" + (teamLoadProgressBar / teamCountTotal * 100) + "%");

		var data = JSON.parse(req.responseText);
		//console.log(teamData.rookieYear+" "+year+"/awards/"+teamNumber+": "+req.responseText);
		for (var j = 0; j <= 2; j++) {
			if (data[j].Awards !== '{"Awards":[]}') {
				for (var i = 0; i < data[j].Awards.length; i++) {
					awardName = data[j].Awards[i].name;
					awardHilight = awardsHilight(awardName);
					awards += '<span class="awardsDepth' + String(j + 1) + '">' + awardHilight.before + String(year - j) + ' <span class="awardsEventName">' + eventNames[String(year - j)][data[j].Awards[i].eventCode] + '</span><span class="awardsEventCode">' + data[j].Awards[i].eventCode + '</span>: ' + awardName + awardHilight.after;
					if (i === data[j].Awards.length - 1) {
						awards += '<span class="lastAward' + String(j + 1) + '"><span class="awardsSeparator1"> || </span><span class="awardsSeparator2"> // </span><span class="awardsSeparator3"><br></span></span></span>';
					} else {
						awards += '<span class="awardsSeparator1"> || </span><span class="awardsSeparator2"> // </span><span class="awardsSeparator3"><br></span></span>';
					}


				}
			}

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
	var teamDataLoadPromises = [];
	$('#teamDataTabPicker').addClass('alert-danger');
	for (var team in teamList) {
		teamDataLoadPromises.push(new Promise((resolve, reject) => {
			var req = new XMLHttpRequest();
			req.open('GET', apiURL + year + '/teamdata/' + team.teamNumber + "/");
			req.addEventListener('load', function () {
				if (req.responseText.substr(0, 5) !== '"Team') {
					var data = JSON.parse(req.responseText);
					if (data.teams.length > 0) {
						var teamData = data.teams[0];
						$("#teamsTableBody").append(generateTeamTableRow(teamData));
						eventTeamList.push(data.teams[0]);
						//localStorage.teamList = JSON.stringify(eventTeamList);
						resolve();
					}
				}
			});
			req.send();
		}));
	}
	Promise.all(teamDataLoadPromises).then((value) => {
		$('#teamDataTabPicker').removeClass('alert-danger');
		$('#teamDataTabPicker').addClass('alert-success');
	});
}

function tournamentLevel(tournament) {
	"use strict";
	if (tournament === "Qualification") {
		return "qual";
	} else {
		return "playoff";
	}
}

function scoreDetails(matchNumber, tournamentLevel) {
	"use strict";
	var req = new XMLHttpRequest();
	req.open('GET', apiURL + localStorage.currentYear + '/scores/' + localStorage.currentEvent + "/" + tournamentLevel + "/" + matchNumber + "/" + matchNumber + "/");
	req.addEventListener('load', function () {
		if (req.responseText.substr(0, 5) !== '"Team') {
			var data = JSON.parse(req.responseText).MatchScores[0];
			var redAllianceScores, blueAllianceScores = [];
			var scoreKeys = Object.keys(data.alliances[0]);
			$("#scoreDetailsMatchNumber").html(data.matchNumber);
			$("#scoreDetailsMatchLevel").html(data.matchLevel);
			if (data.alliances[0].alliance === "Red") {
				redAllianceScores = Object.values(data.alliances[0]);
				blueAllianceScores = Object.values(data.alliances[1]);
			} else {
				redAllianceScores = Object.values(data.alliances[1]);
				blueAllianceScores = Object.values(data.alliances[0]);
			}
			$("#scoreTableBody").empty();
			for (var i = 0; i < scoreKeys.length; i++) {
				$("#scoreTableBody").append("<tr><td>" + scoreKeys[i] + " : " + redAllianceScores[i] + "</td><td>" + scoreKeys[i] + " : " + blueAllianceScores[i] + "</td></tr");
			}

			openTab(event, 'scoreDetails');
		}
	});
	req.send();
}

function generateMatchTableRow(matchData) {
	"use strict";
	var returnData = '<tr>';
	var matchWinner = "";
	if (matchData.actualStartTime) {
		returnData += "<td>Actual:<br>" + moment(matchData.actualStartTime, 'YYYY-MM-DDTHH:mm:ss').format('ddd hh:mm A') + '</td>';
	} else {
		if (localStorage.offseason === "true") {
			returnData += "<td>Scheduled:<br>" + matchData.startTime + '</td>';
		} else {
			returnData += "<td>Scheduled:<br>" + moment(matchData.startTime, 'YYYY-MM-DDTHH:mm:ss').format('ddd hh:mm:ss A') + '</td>';
		}

	}
	returnData += "<td>" + matchData.description + '</td>';
	returnData += "<td>" + matchData.matchNumber + '</td>';
	if ((matchData.scoreRedFinal !== null) && (matchData.scoreRedFinal > matchData.scoreBlueFinal)) {
		matchWinner = "Red";
		returnData += '<td onclick="scoreDetails(' + matchData.matchNumber + ',' + "'" + tournamentLevel(matchData.tournamentLevel) + "'" + ')"><span class="redScoreWin">R:' + matchData.scoreRedFinal + '</span><br><span class="blueScore"> B:' + matchData.scoreBlueFinal + '</span></td>';
	} else if ((matchData.scoreRedFinal !== null) && matchData.scoreRedFinal < matchData.scoreBlueFinal) {
		matchWinner = "Blue";
		returnData += '<td onclick="scoreDetails(' + matchData.matchNumber + ',' + "'" + tournamentLevel(matchData.tournamentLevel) + "'" + ')"><span class="redScore">R:' + matchData.scoreRedFinal + '</span><br><span class="blueScoreWin"> B:' + matchData.scoreBlueFinal + '</span></td>';
	} else if (matchData.scoreRedFinal !== null) {
		matchWinner = "Tie";
		returnData += '<td onclick="scoreDetails(' + matchData.matchNumber + ',' + "'" + tournamentLevel(matchData.tournamentLevel) + "'" + ')"><span class="redScore">R:' + matchData.scoreRedFinal + '</span><br><span class="blueScore"> B:' + matchData.scoreBlueFinal + '</span></td>';
	} else {
		matchWinner = "No results yet";
		returnData += '<td>No data.</td>';
	}
	returnData += '<td><span class = "redAllianceTeam">' + getTeamForStation(matchData.teams, 'Red1').teamNumber + '</span><br><span class = "blueAllianceTeam">' + getTeamForStation(matchData.teams, 'Blue1').teamNumber + '</span></td>';
	returnData += '<td><span class = "redAllianceTeam">' + getTeamForStation(matchData.teams, 'Red2').teamNumber + '</span><br><span class = "blueAllianceTeam">' + getTeamForStation(matchData.teams, 'Blue2').teamNumber + '</span></td>';
	returnData += '<td><span class = "redAllianceTeam">' + getTeamForStation(matchData.teams, 'Red3').teamNumber + '</span><br><span class = "blueAllianceTeam">' + getTeamForStation(matchData.teams, 'Blue3').teamNumber + '</span></td>';

	//Track the high scoring match
	if (matchData.scoreBlueFinal > localStorage.matchHighScore) {
		localStorage.matchHighScore = matchData.scoreBlueFinal;
		localStorage.highScoreDetails = matchData.description + "<br>(" + getTeamForStation(matchData.teams, 'Blue1').teamNumber + ", " + getTeamForStation(matchData.teams, 'Blue2').teamNumber + ", " + getTeamForStation(matchData.teams, 'Blue3').teamNumber + ")";
	}
	if (matchData.scoreRedFinal > localStorage.matchHighScore) {
		localStorage.matchHighScore = matchData.scoreRedFinal;
		localStorage.highScoreDetails = matchData.description + "<br>(" + getTeamForStation(matchData.teams, 'Red1').teamNumber + ", " + getTeamForStation(matchData.teams, 'Red2').teamNumber + ", " + getTeamForStation(matchData.teams, 'Red3').teamNumber + ")";
	}

	//Track each team's high score
	if (highScores['"' + getTeamForStation(matchData.teams, 'Blue1').teamNumber + '.score"'] < matchData.scoreBlueFinal) {
		highScores['"' + getTeamForStation(matchData.teams, 'Blue1').teamNumber + '.score"'] = matchData.scoreBlueFinal;
		highScores['"' + getTeamForStation(matchData.teams, 'Blue1').teamNumber + '.description"'] = matchData.description;
	}
	if (highScores['"' + getTeamForStation(matchData.teams, 'Blue2').teamNumber + '.score"'] < matchData.scoreBlueFinal) {
		highScores['"' + getTeamForStation(matchData.teams, 'Blue2').teamNumber + '.score"'] = matchData.scoreBlueFinal;
		highScores['"' + getTeamForStation(matchData.teams, 'Blue2').teamNumber + '.description"'] = matchData.description;
	}
	if (highScores['"' + getTeamForStation(matchData.teams, 'Blue3').teamNumber + '.score"'] < matchData.scoreBlueFinal) {
		highScores['"' + getTeamForStation(matchData.teams, 'Blue3').teamNumber + '.score"'] = matchData.scoreBlueFinal;
		highScores['"' + getTeamForStation(matchData.teams, 'Blue3').teamNumber + '.description"'] = matchData.description;
	}
	if (highScores['"' + getTeamForStation(matchData.teams, 'Red1').teamNumber + '.score"'] < matchData.scoreRedFinal) {
		highScores['"' + getTeamForStation(matchData.teams, 'Red1').teamNumber + '.score"'] = matchData.scoreRedFinal;
		highScores['"' + getTeamForStation(matchData.teams, 'Red1').teamNumber + '.description"'] = matchData.description;
	}
	if (highScores['"' + getTeamForStation(matchData.teams, 'Red2').teamNumber + '.score"'] < matchData.scoreRedFinal) {
		highScores['"' + getTeamForStation(matchData.teams, 'Red2').teamNumber + '.score"'] = matchData.scoreRedFinal;
		highScores['"' + getTeamForStation(matchData.teams, 'Red2').teamNumber + '.description"'] = matchData.description;
	}
	if (highScores['"' + getTeamForStation(matchData.teams, 'Red3').teamNumber + '.score"'] < matchData.scoreRedFinal) {
		highScores['"' + getTeamForStation(matchData.teams, 'Red3').teamNumber + '.score"'] = matchData.scoreRedFinal;
		highScores['"' + getTeamForStation(matchData.teams, 'Red3').teamNumber + '.description"'] = matchData.description;
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

function resetVisits() {
	"use strict";
	for (var j = 0; j < eventTeamList.length; j++) {
		var team = JSON.parse(localStorage['teamData' + eventTeamList[j].teamNumber]);
		team.lastVisit = "No recent visit";
		localStorage['teamData' + eventTeamList[j].teamNumber] = JSON.stringify(team);
		$("#lastVisit" + eventTeamList[j].teamNumber).attr("lastvisit", "No recent visit");
		$("#lastVisit" + eventTeamList[j].teamNumber).html("No recent visit");
	}

}

function updateTeamTableRow(teamData) {
	"use strict";
	var teamInfo = JSON.parse(localStorage['teamData' + teamData.teamNumber]);
	var lastVisit = "";
	var avatar = "";
	if (teamInfo.lastVisit === "No recent visit") {
		lastVisit = "No recent visit";
	} else {
		lastVisit = moment(teamInfo.lastVisit).fromNow();
	}
	var returnData = '<tr class="teamsTableRow"><td class = "btn-default" id="teamTableNumber' + teamData.teamNumber + '" onclick="updateTeamInfo(' + teamData.teamNumber + ')"><span class="teamDataNumber">' + teamData.teamNumber + '</span><br><span id="lastVisit' + teamData.teamNumber + '" teamNumber = "' + teamData.teamNumber + '"  lastvisit = "' + teamInfo.lastVisit + '">' + lastVisit + '</span></td>';
	returnData += '<td id="teamTableRank' + teamData.teamNumber + '" class="rank0"></td>';
	if ((teamInfo.avatar !== "null") && (localStorage.currentYear === "2018" && (typeof teamInfo !== "undefined"))) {
		avatar = '<img src="' + teamInfo.avatar + '">&nbsp;';
	}
	if (teamInfo.nameShortLocal === "") {
		returnData += '<td id="teamTableName' + teamData.teamNumber + '">' + '<span id="avatar' + teamData.teamNumber + '">' + avatar + '</span><span class="teamTableName">' + teamInfo.nameShort + '</span></td>';
	} else {
		returnData += '<td  class="bg-success" id="teamTableName' + teamData.teamNumber + '">' + '<span id="avatar' + teamData.teamNumber + '">' + avatar + '</span><span class="teamTableName">' + teamInfo.nameShortLocal + '</span></td>';
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
	var avatar = "";
	if (typeof (localStorage['teamData' + teamData.teamNumber]) !== 'undefined') {
		teamInfo = JSON.parse(localStorage['teamData' + teamData.teamNumber]);
		if (typeof teamInfo.cityStateSort === "undefined") {
			teamInfo.cityStateSort = teamData.country + ":" + teamData.stateProv + ":" + teamData.city;
		}
	} else {
		teamInfo = {
			"nameShort": teamData.nameShort,
			"cityState": teamData.city + ', ' + teamData.stateProv,
			"cityStateSort": teamData.country + ":" + teamData.stateProv + ":" + teamData.city,
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
			"avatar": "null",
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
	returnData += '<tr class="teamsTableRow"><td class = "btn-default" id="teamTableNumber' + teamData.teamNumber + '" onclick="updateTeamInfo(' + teamData.teamNumber + ')"><span class="teamDataNumber">' + teamData.teamNumber + '</span><br><span id="lastVisit' + teamData.teamNumber + '" teamNumber = "' + teamData.teamNumber + '" lastvisit = "' + teamInfo.lastVisit + '">' + lastVisit + '</span></td>';
	//returnData += '<td id="teamTableRank' + teamData.teamNumber + '" class="'+teamTableRankHighlight(teamInfo.rank)+'">' + teamInfo.rank + '</td>';
	returnData += '<td id="teamTableRank' + teamData.teamNumber + '" class="rank0"></td>';
	if ((teamInfo.avatar !== "null") && (localStorage.currentYear === "2018")) {
		avatar = '<img src="' + teamInfo.avatar + '">&nbsp;';
	}
	if (teamInfo.nameShortLocal === "") {
		returnData += '<td id="teamTableName' + teamData.teamNumber + '">' + '<span id="avatar' + teamData.teamNumber + '">' + avatar + '</span><span class="teamTableName">' + teamInfo.nameShort + '</span></td>';
	} else {
		returnData += '<td  class="bg-success" id="teamTableName' + teamData.teamNumber + '">' + '<span id="avatar' + teamData.teamNumber + '">' + avatar + '</span><span class="teamTableName">' + teamInfo.nameShortLocal + '</span></td>';
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
	returnData += '<td class = "cityStateSort">' + teamInfo.cityStateSort + '</td>';
	teamInfo.sponsors = sponsors;
	teamInfo.topSponsors = topSponsors;
	teamInfo.organization = organization;
	localStorage['teamData' + teamData.teamNumber] = JSON.stringify(teamInfo);

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

	if ($("#awardsUpdate").html() === "<br>") {
		$("#awardsUpdate").html("");
	}

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
		message: 'You are about to load team data updates for Team ' + currentTeam + ' from the gatool Cloud. <b>This will replace your local changes to this team</b> with the data you <b><i>or others</i></b> may have stored in the gatool Cloud.<br><b>Are you sure you want to do this?</b>',
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

	//display the amount of localStorage in use
	$("#localStorageUsage").html(localStorageSpace() + " in use");

	//display the last time we had rankings
	$("#allianceselectionlastupdated").html(" (Ranks last updated " + moment(lastRanksUpdate).fromNow() + ")<br>");
	$("#rankstablelastupdated").html("Ranks last updated " + moment(lastRanksUpdate).fromNow());

}

function parsePlayoffMatchName(matchName) {
	"use strict";
	var matchArray = matchName.split(" ");
	if ((matchArray[0] === "Quarterfinal") && (matchArray[1] <= 4)) {
		return "Quarterfinal " + matchArray[1] + " Match 1";
	}
	$("#davidPrice").removeClass("redScore");
	$("#davidPrice").removeClass("blueScore");
	if ((matchArray[0] === "Quarterfinal") && (matchArray[1] > 4)) {
		if (playoffResults["Quarterfinal " + (matchArray[1] - 4)] === "Red") {
			$("#davidPrice").addClass("redScore");
			return "Quarterfinal " + (matchArray[1] - 4) + " Match 2 <br><span class='redScoreWin'>Advantage " + playoffResults["Quarterfinal " + (matchArray[1] - 4)] + "</span>";
		} else if (playoffResults["Quarterfinal " + (matchArray[1] - 4)] === "Blue") {
			$("#davidPrice").addClass("blueScore");
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
			$("#davidPrice").addClass("redScore");
			return "Semifinal " + (matchArray[1] - 2) + " Match 2<br><span class='redScoreWin'>Advantage " + playoffResults["Semifinal " + (matchArray[1] - 2)] + "</span>";
		} else if (playoffResults["Semifinal " + (matchArray[1] - 2)] === "Blue") {
			$("#davidPrice").addClass("blueScore");
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
				$("#davidPrice").addClass("redScore");
				return matchArray[0] + " " + (matchArray[1] || "") + "<br><span class='redScoreWin'>Advantage Red</span>";
			} else if (playoffResults["Final 1"] === "Blue") {
				$("#davidPrice").addClass("blueScore");
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

function inHallOfFame(team, position) {
	"use strict";
	var hofDisplay = "";
	$("#" + position + "HOF").hide();
	for (i = 0; i < hallOfFame.length; i++) {
		if (team === hallOfFame[i].Chairmans) {
			hofDisplay += hallOfFame[i].Year + " " + hallOfFame[i].Challenge + " Chairman's Award" + localStorage.awardSeparator;
		}
		if ((team === hallOfFame[i].Winner1) || (team === hallOfFame[i].Winner2) || (team === hallOfFame[i].Winner3) || (team === hallOfFame[i].Winner4) || (team === hallOfFame[i].Winner5)) {
			hofDisplay += hallOfFame[i].Year + " " + hallOfFame[i].Challenge + " Winner" + localStorage.awardSeparator;
		}
	}
	if (hofDisplay !== "") {
		hofDisplay = hofDisplay.slice(0, hofDisplay.length - localStorage.awardSeparator.length);
		$("#" + position + "HOF").html(hofDisplay);
		$("#" + position + "HOF").show();
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

			teamListArray.sort(function (a, b) {
				return a - b;
			});

			for (i = 0; i < teamListArray.length; i++) {
				teamToInsert = {
					"teamNumber": teamListArray[i]
				};
				teamList.push(teamToInsert);
			}

			$("#eventTeamCount").html(teamList.length);

			$('#teamsListEventName').html(localStorage.eventName);

			getTeamData(teamList, localStorage.currentYear);


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

function localStorageSpace() {
	"use strict";
	var allStrings = '';
	var localStorageSize = {};
	for (var key in window.localStorage) {
		if (window.localStorage.hasOwnProperty(key)) {
			allStrings += window.localStorage[key];
		}
	}
	if (allStrings) {} {
		localStorageSize.size = ((allStrings.length * 16) / (8 * 1024));
		localStorageSize.marker = " KB";
		if (localStorageSize.size > 1024) {
			localStorageSize.marker = " MB";
			localStorageSize.size = localStorageSize.size / 1024;
		}
	}
	return allStrings ? (3 + Math.round(localStorageSize.size)) + localStorageSize.marker : 'Empty (0 KB)';
}
