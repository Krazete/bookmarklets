(function() {
var piano = {
    /* initialization */
    css: document.createElement("style"),
    ui: document.createElement("div"),
    menuleft: document.createElement("div"),
    wave: document.createElement("select"),
    pitch: document.createElement("input"),
    tilt: document.createElement("input"),
    keyboard: document.createElement("div"),
    menuright: document.createElement("div"),
    audio: new AudioContext(),
    keymap: [
        {key: "`",          caps_key: "~",          dom: document.createElement("div"), hz: 0, pressed: 0},
        {key: "Tab",        caps_key: "Tab",        dom: document.createElement("div"), hz: 0, pressed: 0},
        {key: "1",          caps_key: "!",          dom: document.createElement("div"), hz: 0, pressed: 0},
        {key: "q",          caps_key: "Q",          dom: document.createElement("div"), hz: 0, pressed: 0},
        {key: "2",          caps_key: "@",          dom: document.createElement("div"), hz: 0, pressed: 0},
        {key: "w",          caps_key: "W",          dom: document.createElement("div"), hz: 0, pressed: 0},
        {key: "3",          caps_key: "#",          dom: document.createElement("div"), hz: 0, pressed: 0},
        {key: "e",          caps_key: "E",          dom: document.createElement("div"), hz: 0, pressed: 0},
        {key: "r",          caps_key: "R",          dom: document.createElement("div"), hz: 0, pressed: 0},
        {key: "5",          caps_key: "%",          dom: document.createElement("div"), hz: 0, pressed: 0},
        {key: "t",          caps_key: "T",          dom: document.createElement("div"), hz: 0, pressed: 0},
        {key: "6",          caps_key: "^",          dom: document.createElement("div"), hz: 0, pressed: 0},
        {key: "y",          caps_key: "Y",          dom: document.createElement("div"), hz: 0, pressed: 0},
        {key: "u",          caps_key: "U",          dom: document.createElement("div"), hz: 0, pressed: 0},
        {key: "8",          caps_key: "*",          dom: document.createElement("div"), hz: 0, pressed: 0},
        {key: "i",          caps_key: "I",          dom: document.createElement("div"), hz: 0, pressed: 0},
        {key: "9",          caps_key: "(",          dom: document.createElement("div"), hz: 0, pressed: 0},
        {key: "o",          caps_key: "O",          dom: document.createElement("div"), hz: 0, pressed: 0},
        {key: "0",          caps_key: ")",          dom: document.createElement("div"), hz: 0, pressed: 0},
        {key: "p",          caps_key: "P",          dom: document.createElement("div"), hz: 0, pressed: 0},
        {key: "[",          caps_key: "{",          dom: document.createElement("div"), hz: 0, pressed: 0},
        {key: "=",          caps_key: "+",          dom: document.createElement("div"), hz: 0, pressed: 0},
        {key: "]",          caps_key: "}",          dom: document.createElement("div"), hz: 0, pressed: 0},
        {key: "Backspace",  caps_key: "Backspace",  dom: document.createElement("div"), hz: 0, pressed: 0},
        {key: "\\",         caps_key: "|",          dom: document.createElement("div"), hz: 0, pressed: 0},
        {key: "ShiftLeft",  caps_key: "ShiftLeft",  dom: document.createElement("div"), hz: 0, pressed: 0},
        {key: "a",          caps_key: "A",          dom: document.createElement("div"), hz: 0, pressed: 0},
        {key: "z",          caps_key: "Z",          dom: document.createElement("div"), hz: 0, pressed: 0},
        {key: "s",          caps_key: "S",          dom: document.createElement("div"), hz: 0, pressed: 0},
        {key: "x",          caps_key: "X",          dom: document.createElement("div"), hz: 0, pressed: 0},
        {key: "d",          caps_key: "D",          dom: document.createElement("div"), hz: 0, pressed: 0},
        {key: "c",          caps_key: "C",          dom: document.createElement("div"), hz: 0, pressed: 0},
        {key: "v",          caps_key: "V",          dom: document.createElement("div"), hz: 0, pressed: 0},
        {key: "g",          caps_key: "G",          dom: document.createElement("div"), hz: 0, pressed: 0},
        {key: "b",          caps_key: "B",          dom: document.createElement("div"), hz: 0, pressed: 0},
        {key: "h",          caps_key: "H",          dom: document.createElement("div"), hz: 0, pressed: 0},
        {key: "n",          caps_key: "N",          dom: document.createElement("div"), hz: 0, pressed: 0},
        {key: "m",          caps_key: "M",          dom: document.createElement("div"), hz: 0, pressed: 0},
        {key: "k",          caps_key: "K",          dom: document.createElement("div"), hz: 0, pressed: 0},
        {key: ",",          caps_key: "<",          dom: document.createElement("div"), hz: 0, pressed: 0},
        {key: "l",          caps_key: "L",          dom: document.createElement("div"), hz: 0, pressed: 0},
        {key: ".",          caps_key: ">",          dom: document.createElement("div"), hz: 0, pressed: 0},
        {key: ";",          caps_key: ":",          dom: document.createElement("div"), hz: 0, pressed: 0},
        {key: "/",          caps_key: "?",          dom: document.createElement("div"), hz: 0, pressed: 0},
        {key: "ShiftRight", caps_key: "ShiftRight", dom: document.createElement("div"), hz: 0, pressed: 0},
        {key: "Enter",      caps_key: "Enter",      dom: document.createElement("div"), hz: 0, pressed: 0}
    ],
    disc: [
        /* Current Recording History */
        [],
        /* Saved Discs */
        [{"keyi":53,"wave":"triangle","time":0,"timeout":null},{"keyi":55,"wave":"triangle","time":0.1973696145124677,"timeout":null},{"keyi":62,"wave":"triangle","time":0.4063492063492049,"timeout":null},{"keyi":55,"wave":"triangle","time":0.6153287981859421,"timeout":null},{"keyi":62,"wave":"triangle","time":0.8533333333333246,"timeout":null},{"keyi":62,"wave":"triangle","time":2.02594104308389,"timeout":null},{"keyi":60,"wave":"triangle","time":2.5135600907029527,"timeout":null},{"keyi":55,"wave":"triangle","time":3.4017233560090574,"timeout":null},{"keyi":62,"wave":"triangle","time":3.60489795918366,"timeout":null},{"keyi":55,"wave":"triangle","time":3.8254875283446665,"timeout":null},{"keyi":62,"wave":"triangle","time":4.028662131519269,"timeout":null},{"keyi":60,"wave":"triangle","time":4.260861678004517,"timeout":null},{"keyi":58,"wave":"triangle","time":4.696235827664395,"timeout":null},{"keyi":58,"wave":"triangle","time":4.905215419501133,"timeout":null},{"keyi":57,"wave":"triangle","time":5.1200000000000045,"timeout":null},{"keyi":58,"wave":"triangle","time":5.340589569160983,"timeout":null},{"keyi":58,"wave":"triangle","time":5.572789115646259,"timeout":null},{"keyi":51,"wave":"triangle","time":6.669931972789101,"timeout":null},{"keyi":53,"wave":"triangle","time":6.873106575963703,"timeout":null},{"keyi":54,"wave":"triangle","time":7.1053061224489795,"timeout":null},{"keyi":56,"wave":"triangle","time":7.3200907029478515,"timeout":null},{"keyi":58,"wave":"triangle","time":7.52907029478456,"timeout":null},{"keyi":60,"wave":"triangle","time":7.73514739229023,"timeout":null},{"keyi":61,"wave":"triangle","time":7.935419501133794,"timeout":null},{"keyi":63,"wave":"triangle","time":8.161814058956907,"timeout":null},{"keyi":65,"wave":"triangle","time":8.399818594104289,"timeout":null},{"keyi":65,"wave":"triangle","time":11.157188208616788,"timeout":null},{"keyi":65,"wave":"triangle","time":11.412607709750574,"timeout":null},{"keyi":62,"wave":"triangle","time":11.839274376417222,"timeout":null},{"keyi":62,"wave":"triangle","time":12.103401360544211,"timeout":null},{"keyi":58,"wave":"triangle","time":12.550385487528331,"timeout":null},{"keyi":58,"wave":"triangle","time":12.817414965986387,"timeout":null},{"keyi":55,"wave":"triangle","time":13.223764172335592,"timeout":null},{"keyi":58,"wave":"triangle","time":13.479183673469379,"timeout":null},{"keyi":55,"wave":"triangle","time":13.862312925170073,"timeout":null},{"keyi":58,"wave":"triangle","time":14.071292517006782,"timeout":null},{"keyi":60,"wave":"triangle","time":14.303492063492058,"timeout":null},{"keyi":58,"wave":"triangle","time":14.5298866213152,"timeout":null},{"keyi":60,"wave":"triangle","time":14.727256235827667,"timeout":null},{"keyi":62,"wave":"triangle","time":14.988480725623589,"timeout":null},{"keyi":58,"wave":"triangle","time":15.23809523809524,"timeout":null},{"keyi":58,"wave":"triangle","time":15.493514739229028,"timeout":null},{"keyi":53,"wave":"triangle","time":15.981133786848062,"timeout":null},{"keyi":58,"wave":"triangle","time":17.055056689342393,"timeout":null},{"keyi":56,"wave":"triangle","time":17.293061224489776,"timeout":null},{"keyi":58,"wave":"triangle","time":17.502040816326513,"timeout":null},{"keyi":61,"wave":"triangle","time":17.7574603174603,"timeout":null},{"keyi":60,"wave":"triangle","time":18.245079365079363,"timeout":null},{"keyi":58,"wave":"triangle","time":18.721088435374156,"timeout":null},{"keyi":60,"wave":"triangle","time":18.918458049886624,"timeout":null},{"keyi":56,"wave":"triangle","time":19.191292517006787,"timeout":null},{"keyi":68,"wave":"triangle","time":21.809342403628108,"timeout":null},{"keyi":67,"wave":"triangle","time":22.064761904761895,"timeout":null},{"keyi":61,"wave":"triangle","time":24.009433106575955,"timeout":null},{"keyi":60,"wave":"triangle","time":24.247437641723337,"timeout":null},{"keyi":58,"wave":"triangle","time":24.479637188208613,"timeout":null},{"keyi":60,"wave":"triangle","time":24.67700680272108,"timeout":null},{"keyi":58,"wave":"triangle","time":24.944036281179137,"timeout":null},{"keyi":56,"wave":"triangle","time":25.45487528344671,"timeout":null},{"keyi":55,"wave":"triangle","time":25.92507936507937,"timeout":null},{"keyi":56,"wave":"triangle","time":26.151473922902483,"timeout":null},{"keyi":60,"wave":"triangle","time":26.412698412698404,"timeout":null},{"keyi":58,"wave":"triangle","time":26.929342403628112,"timeout":null},{"keyi":53,"wave":"triangle","time":28.64761904761903,"timeout":null},{"keyi":55,"wave":"triangle","time":28.879818594104307,"timeout":null},{"keyi":56,"wave":"triangle","time":29.112018140589555,"timeout":null},{"keyi":55,"wave":"triangle","time":29.384852607709746,"timeout":null},{"keyi":60,"wave":"triangle","time":30.27301587301588,"timeout":null},{"keyi":53,"wave":"triangle","time":31.103129251700665,"timeout":null},{"keyi":55,"wave":"triangle","time":34.41777777777776,"timeout":null},{"keyi":62,"wave":"triangle","time":34.649977324263034,"timeout":null},{"keyi":65,"wave":"triangle","time":34.980861678004516,"timeout":null},{"keyi":62,"wave":"triangle","time":35.25369614512471,"timeout":null},{"keyi":58,"wave":"triangle","time":35.497505668934224,"timeout":null},{"keyi":55,"wave":"triangle","time":35.735510204081635,"timeout":null},{"keyi":58,"wave":"triangle","time":35.996734693877556,"timeout":null},{"keyi":53,"wave":"triangle","time":37.0938775510204,"timeout":null},{"keyi":55,"wave":"triangle","time":37.54086167800452,"timeout":null},{"keyi":62,"wave":"triangle","time":37.80208616780044,"timeout":null},{"keyi":60,"wave":"triangle","time":38.04589569160996,"timeout":null},{"keyi":58,"wave":"triangle","time":38.2897052154195,"timeout":null},{"keyi":60,"wave":"triangle","time":38.54512471655329,"timeout":null},{"keyi":62,"wave":"triangle","time":39.07918367346937,"timeout":null},{"keyi":58,"wave":"triangle","time":39.648072562358266,"timeout":null},{"keyi":65,"wave":"triangle","time":40.245986394557804,"timeout":null},{"keyi":54,"wave":"triangle","time":41.63337868480724,"timeout":null},{"keyi":65,"wave":"triangle","time":41.89460317460316,"timeout":null},{"keyi":54,"wave":"triangle","time":42.16743764172335,"timeout":null},{"keyi":65,"wave":"triangle","time":42.393832199546466,"timeout":null},{"keyi":63,"wave":"triangle","time":42.66086167800452,"timeout":null},{"keyi":61,"wave":"triangle","time":42.90467120181404,"timeout":null},{"keyi":63,"wave":"triangle","time":43.14267573696145,"timeout":null},{"keyi":65,"wave":"triangle","time":43.40970521541951,"timeout":null},{"keyi":60,"wave":"triangle","time":43.665124716553294,"timeout":null},{"keyi":61,"wave":"triangle","time":43.937959183673456,"timeout":null},{"keyi":56,"wave":"triangle","time":44.22240362811792,"timeout":null},{"keyi":53,"wave":"triangle","time":44.756462585034,"timeout":null},{"keyi":56,"wave":"triangle","time":45.046712018140596,"timeout":null},{"keyi":58,"wave":"triangle","time":46.71274376417233,"timeout":null},{"keyi":60,"wave":"triangle","time":46.96816326530612,"timeout":null},{"keyi":61,"wave":"triangle","time":47.22938775510204,"timeout":null},{"keyi":60,"wave":"triangle","time":47.76925170068026,"timeout":null},{"keyi":61,"wave":"triangle","time":48.0130612244898,"timeout":null},{"keyi":60,"wave":"triangle","time":48.32653061224488,"timeout":null},{"keyi":55,"wave":"triangle","time":49.27854875283447,"timeout":null},{"keyi":56,"wave":"triangle","time":49.51655328798185,"timeout":null},{"keyi":58,"wave":"triangle","time":49.77777777777777,"timeout":null},{"keyi":58,"wave":"triangle","time":50.02158730158729,"timeout":null},{"keyi":56,"wave":"triangle","time":50.265396825396806,"timeout":null},{"keyi":55,"wave":"triangle","time":50.54403628117913,"timeout":null},{"keyi":56,"wave":"triangle","time":50.793650793650784,"timeout":null},{"keyi":58,"wave":"triangle","time":51.06068027210884,"timeout":null},{"keyi":60,"wave":"triangle","time":51.36834467120181,"timeout":null},{"keyi":65,"wave":"triangle","time":51.7166439909297,"timeout":null},{"keyi":67,"wave":"triangle","time":52.34938775510204,"timeout":null},{"keyi":68,"wave":"triangle","time":52.999546485260765,"timeout":null},{"keyi":68,"wave":"triangle","time":53.5974603174603,"timeout":null},{"keyi":65,"wave":"triangle","time":55.333151927437626,"timeout":null},{"keyi":65,"wave":"triangle","time":55.64662131519273,"timeout":null},{"keyi":68,"wave":"triangle","time":57.301043083900225,"timeout":null},{"keyi":67,"wave":"triangle","time":57.620317460317466,"timeout":null}],
        [{"keyi":52,"wave":"sine","time":0,"timeout":null},{"keyi":67,"wave":"sine","time":0.01160997732421265,"timeout":null},{"keyi":55,"wave":"sine","time":0.4353741496598218,"timeout":null},{"keyi":66,"wave":"sine","time":0.6501587301586937,"timeout":null},{"keyi":60,"wave":"sine","time":0.9055782312925089,"timeout":null},{"keyi":67,"wave":"sine","time":0.9113832199546437,"timeout":null},{"keyi":53,"wave":"sine","time":1.3873922902494087,"timeout":null},{"keyi":65,"wave":"sine","time":1.3873922902494087,"timeout":null},{"keyi":56,"wave":"sine","time":1.8111564625850178,"timeout":null},{"keyi":60,"wave":"sine","time":2.226213151927425,"timeout":null},{"keyi":68,"wave":"sine","time":2.2407256235827617,"timeout":null},{"keyi":48,"wave":"sine","time":2.7399546485260657,"timeout":null},{"keyi":67,"wave":"sine","time":2.7399546485260657,"timeout":null},{"keyi":55,"wave":"sine","time":3.2043537414965613,"timeout":null},{"keyi":60,"wave":"sine","time":3.633922902494305,"timeout":null},{"keyi":64,"wave":"sine","time":4.115736961451205,"timeout":null},{"keyi":55,"wave":"sine","time":4.585941043083892,"timeout":null},{"keyi":64,"wave":"sine","time":5.044535147392253,"timeout":null},{"keyi":52,"wave":"sine","time":5.491519274376401,"timeout":null},{"keyi":67,"wave":"sine","time":5.491519274376401,"timeout":null},{"keyi":55,"wave":"sine","time":5.98494331065757,"timeout":null},{"keyi":64,"wave":"sine","time":6.420317460317449,"timeout":null},{"keyi":68,"wave":"sine","time":6.896326530612214,"timeout":null},{"keyi":47,"wave":"sine","time":6.896326530612214,"timeout":null},{"keyi":53,"wave":"sine","time":7.343310657596362,"timeout":null},{"keyi":67,"wave":"sine","time":7.604535147392255,"timeout":null},{"keyi":56,"wave":"sine","time":7.819319727891127,"timeout":null},{"keyi":65,"wave":"sine","time":7.836734693877531,"timeout":null},{"keyi":67,"wave":"sine","time":8.3301587301587,"timeout":null},{"keyi":48,"wave":"sine","time":8.335963718820835,"timeout":null},{"keyi":52,"wave":"sine","time":8.794557823129253,"timeout":null},{"keyi":55,"wave":"sine","time":9.264761904761883,"timeout":null},{"keyi":58,"wave":"sine","time":9.746575963718783,"timeout":null}],
        [{"keyi":27,"wave":"sawtooth","time":0,"timeout":null},{"keyi":27,"wave":"sawtooth","time":0.31927437641723344,"timeout":null},{"keyi":29,"wave":"sawtooth","time":0.49342403628117637,"timeout":null},{"keyi":27,"wave":"sawtooth","time":0.9810430839002251,"timeout":null},{"keyi":32,"wave":"sawtooth","time":1.4744671201814086,"timeout":null},{"keyi":31,"wave":"sawtooth","time":1.9736961451247126,"timeout":null},{"keyi":27,"wave":"sawtooth","time":2.9663492063492,"timeout":null},{"keyi":27,"wave":"sawtooth","time":3.297233560090696,"timeout":null},{"keyi":29,"wave":"sawtooth","time":3.430748299319724,"timeout":null},{"keyi":27,"wave":"sawtooth","time":3.895147392290248,"timeout":null},{"keyi":34,"wave":"sawtooth","time":4.400181405895687,"timeout":null},{"keyi":32,"wave":"sawtooth","time":4.870385487528345,"timeout":null},{"keyi":27,"wave":"sawtooth","time":5.886258503401358,"timeout":null},{"keyi":27,"wave":"sawtooth","time":6.1997278911564635,"timeout":null},{"keyi":39,"wave":"sawtooth","time":6.368072562358272,"timeout":null},{"keyi":36,"wave":"sawtooth","time":6.861496598639455,"timeout":null},{"keyi":32,"wave":"sawtooth","time":7.337505668934234,"timeout":null},{"keyi":31,"wave":"sawtooth","time":7.865759637188212,"timeout":null},{"keyi":29,"wave":"sawtooth","time":8.405623582766431,"timeout":null},{"keyi":37,"wave":"sawtooth","time":9.589841269841266,"timeout":null},{"keyi":37,"wave":"sawtooth","time":9.891700680272102,"timeout":null},{"keyi":36,"wave":"sawtooth","time":10.11809523809523,"timeout":null},{"keyi":32,"wave":"sawtooth","time":10.628934240362803,"timeout":null},{"keyi":34,"wave":"sawtooth","time":11.206530612244897,"timeout":null},{"keyi":32,"wave":"sawtooth","time":11.789931972789113,"timeout":null}],
        [{"keyi":27,"wave":"triangle","time":0,"timeout":null},{"keyi":30,"wave":"triangle","time":1.021333333333331,"timeout":null},{"keyi":25,"wave":"triangle","time":2.4799999999999898,"timeout":null},{"keyi":32,"wave":"triangle","time":3.6213333333333253,"timeout":null},{"keyi":27,"wave":"triangle","time":4.661333333333346,"timeout":null},{"keyi":27,"wave":"triangle","time":5.669333333333327,"timeout":null},{"keyi":30,"wave":"triangle","time":6.629333333333335,"timeout":null},{"keyi":25,"wave":"triangle","time":7.501333333333321,"timeout":null},{"keyi":32,"wave":"triangle","time":8.22933333333333,"timeout":null},{"keyi":51,"wave":"triangle","time":11.360000000000014,"timeout":null},{"keyi":58,"wave":"triangle","time":11.981333333333339,"timeout":null},{"keyi":51,"wave":"triangle","time":13.400000000000006,"timeout":null},{"keyi":51,"wave":"triangle","time":14.781333333333322,"timeout":null},{"keyi":58,"wave":"triangle","time":15.181333333333328,"timeout":null},{"keyi":51,"wave":"triangle","time":15.52000000000001,"timeout":null},{"keyi":58,"wave":"triangle","time":15.869333333333344,"timeout":null},{"keyi":59,"wave":"triangle","time":16.189333333333337,"timeout":null},{"keyi":58,"wave":"triangle","time":16.549333333333323,"timeout":null},{"keyi":51,"wave":"triangle","time":16.840000000000003,"timeout":null},{"keyi":58,"wave":"triangle","time":17.149333333333345,"timeout":null},{"keyi":51,"wave":"triangle","time":17.46933333333334,"timeout":null},{"keyi":58,"wave":"triangle","time":17.810666666666663,"timeout":null},{"keyi":51,"wave":"triangle","time":18.141333333333336,"timeout":null},{"keyi":58,"wave":"triangle","time":18.429333333333346,"timeout":null},{"keyi":59,"wave":"triangle","time":18.781333333333322,"timeout":null},{"keyi":58,"wave":"triangle","time":19.090666666666664,"timeout":null},{"keyi":51,"wave":"triangle","time":19.410666666666657,"timeout":null},{"keyi":58,"wave":"triangle","time":19.74133333333333,"timeout":null},{"keyi":51,"wave":"triangle","time":20.101333333333343,"timeout":null},{"keyi":27,"wave":"triangle","time":20.109333333333325,"timeout":null},{"keyi":58,"wave":"triangle","time":20.439999999999998,"timeout":null},{"keyi":51,"wave":"triangle","time":20.75999999999999,"timeout":null},{"keyi":58,"wave":"triangle","time":21.069333333333333,"timeout":null},{"keyi":59,"wave":"triangle","time":21.400000000000006,"timeout":null},{"keyi":58,"wave":"triangle","time":21.661333333333346,"timeout":null},{"keyi":51,"wave":"triangle","time":21.98133333333334,"timeout":null},{"keyi":58,"wave":"triangle","time":22.26933333333332,"timeout":null},{"keyi":51,"wave":"triangle","time":22.581333333333333,"timeout":null},{"keyi":30,"wave":"triangle","time":22.610666666666674,"timeout":null},{"keyi":58,"wave":"triangle","time":22.919999999999987,"timeout":null},{"keyi":51,"wave":"triangle","time":23.330666666666644,"timeout":null},{"keyi":58,"wave":"triangle","time":23.650666666666694,"timeout":null},{"keyi":59,"wave":"triangle","time":23.98933333333335,"timeout":null},{"keyi":58,"wave":"triangle","time":24.309333333333342,"timeout":null},{"keyi":51,"wave":"triangle","time":24.610666666666674,"timeout":null},{"keyi":58,"wave":"triangle","time":24.930666666666667,"timeout":null},{"keyi":51,"wave":"triangle","time":25.25066666666666,"timeout":null},{"keyi":25,"wave":"triangle","time":25.28,"timeout":null},{"keyi":58,"wave":"triangle","time":25.610666666666674,"timeout":null},{"keyi":51,"wave":"triangle","time":25.930666666666667,"timeout":null},{"keyi":58,"wave":"triangle","time":26.26133333333334,"timeout":null},{"keyi":59,"wave":"triangle","time":26.621333333333354,"timeout":null},{"keyi":58,"wave":"triangle","time":26.960000000000008,"timeout":null},{"keyi":51,"wave":"triangle","time":27.28,"timeout":null},{"keyi":58,"wave":"triangle","time":27.54933333333335,"timeout":null},{"keyi":51,"wave":"triangle","time":27.880000000000024,"timeout":null},{"keyi":32,"wave":"triangle","time":27.890666666666647,"timeout":null},{"keyi":58,"wave":"triangle","time":28.159999999999997,"timeout":null},{"keyi":51,"wave":"triangle","time":28.50933333333333,"timeout":null},{"keyi":58,"wave":"triangle","time":28.869333333333344,"timeout":null},{"keyi":59,"wave":"triangle","time":29.22133333333332,"timeout":null},{"keyi":58,"wave":"triangle","time":29.53066666666669,"timeout":null},{"keyi":51,"wave":"triangle","time":29.840000000000003,"timeout":null},{"keyi":58,"wave":"triangle","time":30.181333333333356,"timeout":null},{"keyi":27,"wave":"triangle","time":30.50933333333333,"timeout":null},{"keyi":51,"wave":"triangle","time":30.52000000000001,"timeout":null},{"keyi":27,"wave":"triangle","time":30.78933333333336,"timeout":null},{"keyi":58,"wave":"triangle","time":30.829333333333324,"timeout":null},{"keyi":27,"wave":"triangle","time":31.141333333333336,"timeout":null},{"keyi":51,"wave":"triangle","time":31.189333333333337,"timeout":null},{"keyi":27,"wave":"triangle","time":31.46933333333331,"timeout":null},{"keyi":58,"wave":"triangle","time":31.50933333333333,"timeout":null},{"keyi":27,"wave":"triangle","time":31.821333333333342,"timeout":null},{"keyi":59,"wave":"triangle","time":31.840000000000003,"timeout":null},{"keyi":27,"wave":"triangle","time":32.14933333333332,"timeout":null},{"keyi":58,"wave":"triangle","time":32.20000000000002,"timeout":null},{"keyi":51,"wave":"triangle","time":32.50933333333333,"timeout":null},{"keyi":27,"wave":"triangle","time":32.52000000000001,"timeout":null},{"keyi":58,"wave":"triangle","time":32.82133333333334,"timeout":null},{"keyi":27,"wave":"triangle","time":32.861333333333306,"timeout":null},{"keyi":51,"wave":"triangle","time":33.170666666666676,"timeout":null},{"keyi":30,"wave":"triangle","time":33.181333333333356,"timeout":null},{"keyi":58,"wave":"triangle","time":33.47733333333335,"timeout":null},{"keyi":30,"wave":"triangle","time":33.50133333333335,"timeout":null},{"keyi":51,"wave":"triangle","time":33.82133333333334,"timeout":null},{"keyi":30,"wave":"triangle","time":33.84,"timeout":null},{"keyi":58,"wave":"triangle","time":34.10933333333335,"timeout":null},{"keyi":30,"wave":"triangle","time":34.16,"timeout":null},{"keyi":59,"wave":"triangle","time":34.42666666666665,"timeout":null},{"keyi":30,"wave":"triangle","time":34.50133333333335,"timeout":null},{"keyi":58,"wave":"triangle","time":34.73066666666668,"timeout":null},{"keyi":30,"wave":"triangle","time":34.81066666666666,"timeout":null},{"keyi":51,"wave":"triangle","time":35.08000000000001,"timeout":null},{"keyi":30,"wave":"triangle","time":35.135999999999996,"timeout":null},{"keyi":58,"wave":"triangle","time":35.400000000000006,"timeout":null},{"keyi":30,"wave":"triangle","time":35.45066666666665,"timeout":null},{"keyi":51,"wave":"triangle","time":35.74133333333336,"timeout":null},{"keyi":25,"wave":"triangle","time":35.78133333333332,"timeout":null},{"keyi":58,"wave":"triangle","time":36.05066666666667,"timeout":null},{"keyi":25,"wave":"triangle","time":36.09066666666669,"timeout":null},{"keyi":51,"wave":"triangle","time":36.42133333333331,"timeout":null},{"keyi":25,"wave":"triangle","time":36.440000000000026,"timeout":null},{"keyi":58,"wave":"triangle","time":36.72,"timeout":null},{"keyi":25,"wave":"triangle","time":36.78133333333332,"timeout":null},{"keyi":59,"wave":"triangle","time":37.101333333333315,"timeout":null},{"keyi":25,"wave":"triangle","time":37.119999999999976,"timeout":null},{"keyi":58,"wave":"triangle","time":37.46133333333333,"timeout":null},{"keyi":25,"wave":"triangle","time":37.47200000000001,"timeout":null},{"keyi":51,"wave":"triangle","time":37.79999999999998,"timeout":null},{"keyi":25,"wave":"triangle","time":37.84,"timeout":null},{"keyi":58,"wave":"triangle","time":38.141333333333336,"timeout":null},{"keyi":25,"wave":"triangle","time":38.20000000000002,"timeout":null},{"keyi":51,"wave":"triangle","time":38.429333333333346,"timeout":null},{"keyi":32,"wave":"triangle","time":38.54933333333335,"timeout":null},{"keyi":58,"wave":"triangle","time":38.76000000000002,"timeout":null},{"keyi":32,"wave":"triangle","time":38.861333333333306,"timeout":null},{"keyi":51,"wave":"triangle","time":39.06933333333333,"timeout":null},{"keyi":32,"wave":"triangle","time":39.14933333333332,"timeout":null},{"keyi":58,"wave":"triangle","time":39.400000000000006,"timeout":null},{"keyi":32,"wave":"triangle","time":39.49066666666667,"timeout":null},{"keyi":59,"wave":"triangle","time":39.67999999999998,"timeout":null},{"keyi":32,"wave":"triangle","time":39.81066666666666,"timeout":null},{"keyi":58,"wave":"triangle","time":39.96000000000001,"timeout":null},{"keyi":32,"wave":"triangle","time":40.119999999999976,"timeout":null},{"keyi":51,"wave":"triangle","time":40.30933333333334,"timeout":null},{"keyi":32,"wave":"triangle","time":40.381333333333345,"timeout":null},{"keyi":58,"wave":"triangle","time":40.69066666666666,"timeout":null},{"keyi":32,"wave":"triangle","time":40.70933333333332,"timeout":null},{"keyi":51,"wave":"triangle","time":41.141333333333336,"timeout":null}],
        [{"keyi":48,"wave":"triangle","time":0,"timeout":null},{"keyi":48,"wave":"triangle","time":0.7546485260770979,"timeout":null},{"keyi":48,"wave":"triangle","time":1.5092970521541957,"timeout":null},{"keyi":44,"wave":"triangle","time":2.2871655328798184,"timeout":null},{"keyi":51,"wave":"triangle","time":2.9721541950113384,"timeout":null},{"keyi":48,"wave":"triangle","time":3.262403628117916,"timeout":null},{"keyi":44,"wave":"triangle","time":4.028662131519276,"timeout":null},{"keyi":51,"wave":"triangle","time":4.643990929705215,"timeout":null},{"keyi":48,"wave":"triangle","time":4.934240362811789,"timeout":null},{"keyi":55,"wave":"triangle","time":6.443537414965984,"timeout":null},{"keyi":55,"wave":"triangle","time":7.209795918367345,"timeout":null},{"keyi":55,"wave":"triangle","time":7.941224489795918,"timeout":null},{"keyi":56,"wave":"triangle","time":8.661043083900228,"timeout":null},{"keyi":51,"wave":"triangle","time":9.206712018140589,"timeout":null},{"keyi":47,"wave":"triangle","time":9.508571428571425,"timeout":null},{"keyi":44,"wave":"triangle","time":10.30965986394558,"timeout":null},{"keyi":51,"wave":"triangle","time":10.948208616780047,"timeout":null},{"keyi":48,"wave":"triangle","time":11.226848072562358,"timeout":null}],
        [{"keyi":39,"wave":"triangle","time":0,"timeout":null},{"keyi":37,"wave":"triangle","time":0,"timeout":null},{"keyi":39,"wave":"triangle","time":0.39200000000005275,"timeout":null},{"keyi":37,"wave":"triangle","time":0.39200000000005275,"timeout":null},{"keyi":39,"wave":"triangle","time":0.7706666666666706,"timeout":null},{"keyi":37,"wave":"triangle","time":0.7706666666666706,"timeout":null},{"keyi":37,"wave":"triangle","time":1.1520000000000437,"timeout":null},{"keyi":39,"wave":"triangle","time":1.1706666666667047,"timeout":null},{"keyi":39,"wave":"triangle","time":1.570666666666682,"timeout":null},{"keyi":37,"wave":"triangle","time":1.570666666666682,"timeout":null},{"keyi":39,"wave":"triangle","time":1.970666666666716,"timeout":null},{"keyi":37,"wave":"triangle","time":1.9733333333333576,"timeout":null},{"keyi":36,"wave":"triangle","time":2.3520000000000323,"timeout":null},{"keyi":39,"wave":"triangle","time":2.3706666666666933,"timeout":null},{"keyi":39,"wave":"triangle","time":2.810666666666691,"timeout":null},{"keyi":36,"wave":"triangle","time":2.810666666666691,"timeout":null},{"keyi":39,"wave":"triangle","time":3.2106666666666683,"timeout":null},{"keyi":36,"wave":"triangle","time":3.2106666666666683,"timeout":null},{"keyi":39,"wave":"triangle","time":3.6106666666667024,"timeout":null},{"keyi":36,"wave":"triangle","time":3.6106666666667024,"timeout":null},{"keyi":39,"wave":"triangle","time":4.0400000000000205,"timeout":null},{"keyi":36,"wave":"triangle","time":4.0400000000000205,"timeout":null},{"keyi":39,"wave":"triangle","time":4.432000000000016,"timeout":null},{"keyi":36,"wave":"triangle","time":4.432000000000016,"timeout":null},{"keyi":43,"wave":"triangle","time":4.840000000000032,"timeout":null},{"keyi":34,"wave":"triangle","time":4.840000000000032,"timeout":null},{"keyi":43,"wave":"triangle","time":5.2613333333333685,"timeout":null},{"keyi":34,"wave":"triangle","time":5.2613333333333685,"timeout":null},{"keyi":34,"wave":"triangle","time":5.621333333333382,"timeout":null},{"keyi":43,"wave":"triangle","time":5.661333333333346,"timeout":null},{"keyi":34,"wave":"triangle","time":6.0400000000000205,"timeout":null},{"keyi":43,"wave":"triangle","time":6.06133333333338,"timeout":null},{"keyi":43,"wave":"triangle","time":6.450666666666677,"timeout":null},{"keyi":34,"wave":"triangle","time":6.450666666666677,"timeout":null},{"keyi":34,"wave":"triangle","time":6.810666666666691,"timeout":null},{"keyi":43,"wave":"triangle","time":6.8320000000000505,"timeout":null},{"keyi":44,"wave":"triangle","time":7.28000000000003,"timeout":null},{"keyi":32,"wave":"triangle","time":7.28000000000003,"timeout":null},{"keyi":44,"wave":"triangle","time":8.06133333333338,"timeout":null},{"keyi":32,"wave":"triangle","time":8.06133333333338,"timeout":null},{"keyi":44,"wave":"triangle","time":8.472000000000037,"timeout":null},{"keyi":32,"wave":"triangle","time":8.472000000000037,"timeout":null},{"keyi":43,"wave":"triangle","time":8.877333333333354,"timeout":null},{"keyi":34,"wave":"triangle","time":8.880000000000052,"timeout":null},{"keyi":36,"wave":"triangle","time":9.261333333333369,"timeout":null},{"keyi":41,"wave":"triangle","time":9.28000000000003,"timeout":null},{"keyi":39,"wave":"triangle","time":9.690666666666687,"timeout":null},{"keyi":37,"wave":"triangle","time":9.690666666666687,"timeout":null},{"keyi":39,"wave":"triangle","time":10.120000000000005,"timeout":null},{"keyi":37,"wave":"triangle","time":10.120000000000005,"timeout":null},{"keyi":39,"wave":"triangle","time":10.520000000000039,"timeout":null},{"keyi":37,"wave":"triangle","time":10.520000000000039,"timeout":null},{"keyi":39,"wave":"triangle","time":10.941333333333375,"timeout":null},{"keyi":37,"wave":"triangle","time":10.941333333333375,"timeout":null},{"keyi":37,"wave":"triangle","time":11.330666666666673,"timeout":null},{"keyi":39,"wave":"triangle","time":11.352000000000032,"timeout":null},{"keyi":39,"wave":"triangle","time":11.77066666666667,"timeout":null},{"keyi":37,"wave":"triangle","time":11.77066666666667,"timeout":null},{"keyi":36,"wave":"triangle","time":12.160000000000025,"timeout":null},{"keyi":39,"wave":"triangle","time":12.181333333333384,"timeout":null},{"keyi":39,"wave":"triangle","time":12.592000000000041,"timeout":null},{"keyi":36,"wave":"triangle","time":12.592000000000041,"timeout":null},{"keyi":39,"wave":"triangle","time":13.02133333333336,"timeout":null},{"keyi":36,"wave":"triangle","time":13.02133333333336,"timeout":null},{"keyi":39,"wave":"triangle","time":13.439999999999998,"timeout":null},{"keyi":36,"wave":"triangle","time":13.439999999999998,"timeout":null},{"keyi":36,"wave":"triangle","time":13.850666666666712,"timeout":null},{"keyi":39,"wave":"triangle","time":13.861333333333334,"timeout":null},{"keyi":39,"wave":"triangle","time":14.240000000000009,"timeout":null},{"keyi":36,"wave":"triangle","time":14.240000000000009,"timeout":null},{"keyi":43,"wave":"triangle","time":14.680000000000007,"timeout":null},{"keyi":34,"wave":"triangle","time":14.682666666666705,"timeout":null},{"keyi":43,"wave":"triangle","time":15.090666666666664,"timeout":null},{"keyi":34,"wave":"triangle","time":15.093333333333362,"timeout":null},{"keyi":43,"wave":"triangle","time":15.512,"timeout":null},{"keyi":34,"wave":"triangle","time":15.512,"timeout":null},{"keyi":34,"wave":"triangle","time":15.901333333333355,"timeout":null},{"keyi":43,"wave":"triangle","time":15.912000000000035,"timeout":null},{"keyi":43,"wave":"triangle","time":16.352000000000032,"timeout":null},{"keyi":34,"wave":"triangle","time":16.352000000000032,"timeout":null},{"keyi":43,"wave":"triangle","time":16.760000000000048,"timeout":null},{"keyi":34,"wave":"triangle","time":16.760000000000048,"timeout":null},{"keyi":44,"wave":"triangle","time":17.170666666666705,"timeout":null},{"keyi":32,"wave":"triangle","time":17.170666666666705,"timeout":null},{"keyi":39,"wave":"triangle","time":17.951999999999998,"timeout":null},{"keyi":37,"wave":"triangle","time":17.951999999999998,"timeout":null},{"keyi":44,"wave":"triangle","time":18.432000000000016,"timeout":null},{"keyi":32,"wave":"triangle","time":18.432000000000016,"timeout":null}],
        [{"keyi":43,"wave":"triangle","time":0,"timeout":null},{"keyi":43,"wave":"triangle","time":0.1999999999999993,"timeout":null},{"keyi":43,"wave":"triangle","time":0.879999999999999,"timeout":null},{"keyi":43,"wave":"triangle","time":1.5386666666666642,"timeout":null},{"keyi":44,"wave":"triangle","time":1.7680000000000007,"timeout":null},{"keyi":44,"wave":"triangle","time":2.2586666666666666,"timeout":null},{"keyi":39,"wave":"triangle","time":2.84,"timeout":null},{"keyi":41,"wave":"triangle","time":3.3599999999999994,"timeout":null},{"keyi":41,"wave":"triangle","time":4.069333333333333,"timeout":null},{"keyi":41,"wave":"triangle","time":4.407999999999998,"timeout":null},{"keyi":43,"wave":"triangle","time":4.959999999999997,"timeout":null},{"keyi":43,"wave":"triangle","time":5.32,"timeout":null},{"keyi":43,"wave":"triangle","time":6.007999999999999,"timeout":null},{"keyi":43,"wave":"triangle","time":6.279999999999998,"timeout":null},{"keyi":43,"wave":"triangle","time":7.338666666666665,"timeout":null},{"keyi":43,"wave":"triangle","time":7.648,"timeout":null},{"keyi":43,"wave":"triangle","time":8.058666666666667,"timeout":null},{"keyi":43,"wave":"triangle","time":8.559999999999999,"timeout":null},{"keyi":41,"wave":"triangle","time":9,"timeout":null},{"keyi":41,"wave":"triangle","time":9.36,"timeout":null},{"keyi":39,"wave":"triangle","time":9.719999999999999,"timeout":null},{"keyi":41,"wave":"triangle","time":10.168,"timeout":null},{"keyi":41,"wave":"triangle","time":10.527999999999999,"timeout":null},{"keyi":36,"wave":"triangle","time":13.218666666666664,"timeout":null},{"keyi":41,"wave":"triangle","time":13.648,"timeout":null},{"keyi":41,"wave":"triangle","time":14.280000000000001,"timeout":null},{"keyi":41,"wave":"triangle","time":14.629333333333335,"timeout":null},{"keyi":43,"wave":"triangle","time":15.207999999999998,"timeout":null},{"keyi":43,"wave":"triangle","time":15.469333333333331,"timeout":null},{"keyi":43,"wave":"triangle","time":15.839999999999996,"timeout":null},{"keyi":44,"wave":"triangle","time":16.029333333333334,"timeout":null},{"keyi":44,"wave":"triangle","time":16.378666666666668,"timeout":null},{"keyi":46,"wave":"triangle","time":16.858666666666664,"timeout":null},{"keyi":46,"wave":"triangle","time":17.14933333333333,"timeout":null},{"keyi":46,"wave":"triangle","time":17.759999999999998,"timeout":null},{"keyi":46,"wave":"triangle","time":18.349333333333334,"timeout":null},{"keyi":46,"wave":"triangle","time":18.567999999999998,"timeout":null},{"keyi":46,"wave":"triangle","time":18.799999999999997,"timeout":null},{"keyi":48,"wave":"triangle","time":19.08,"timeout":null},{"keyi":48,"wave":"triangle","time":19.65866666666667,"timeout":null},{"keyi":48,"wave":"triangle","time":19.967999999999996,"timeout":null},{"keyi":48,"wave":"triangle","time":20.498666666666665,"timeout":null},{"keyi":48,"wave":"triangle","time":20.858666666666664,"timeout":null},{"keyi":48,"wave":"triangle","time":21.138666666666666,"timeout":null},{"keyi":48,"wave":"triangle","time":21.408,"timeout":null},{"keyi":48,"wave":"triangle","time":21.78933333333333,"timeout":null},{"keyi":48,"wave":"triangle","time":22.119999999999997,"timeout":null},{"keyi":44,"wave":"triangle","time":22.560000000000002,"timeout":null},{"keyi":43,"wave":"triangle","time":23.538666666666664,"timeout":null},{"keyi":43,"wave":"triangle","time":23.82933333333333,"timeout":null},{"keyi":41,"wave":"triangle","time":24.528,"timeout":null},{"keyi":36,"wave":"triangle","time":26.218666666666664,"timeout":null},{"keyi":37,"wave":"triangle","time":26.54933333333333,"timeout":null},{"keyi":41,"wave":"triangle","time":27.28,"timeout":null},{"keyi":41,"wave":"triangle","time":28.069333333333333,"timeout":null},{"keyi":41,"wave":"triangle","time":29.578666666666663,"timeout":null},{"keyi":37,"wave":"triangle","time":30.309333333333335,"timeout":null},{"keyi":36,"wave":"triangle","time":30.629333333333335,"timeout":null},{"keyi":36,"wave":"triangle","time":31.439999999999998,"timeout":null},{"keyi":36,"wave":"triangle","time":33.04,"timeout":null},{"keyi":41,"wave":"triangle","time":33.57866666666666,"timeout":null},{"keyi":43,"wave":"triangle","time":33.86933333333333,"timeout":null},{"keyi":43,"wave":"triangle","time":34.6,"timeout":null},{"keyi":43,"wave":"triangle","time":36.33866666666667,"timeout":null},{"keyi":41,"wave":"triangle","time":37.007999999999996,"timeout":null},{"keyi":36,"wave":"triangle","time":37.32,"timeout":null},{"keyi":41,"wave":"triangle","time":38.33866666666667,"timeout":null},{"keyi":36,"wave":"triangle","time":38.669333333333334,"timeout":null},{"keyi":34,"wave":"triangle","time":39.007999999999996,"timeout":null},{"keyi":32,"wave":"triangle","time":40.10933333333333,"timeout":null},{"keyi":32,"wave":"triangle","time":40.93866666666666,"timeout":null},{"keyi":36,"wave":"triangle","time":43.688,"timeout":null},{"keyi":41,"wave":"triangle","time":44.138666666666666,"timeout":null},{"keyi":41,"wave":"triangle","time":44.888,"timeout":null},{"keyi":41,"wave":"triangle","time":45.14933333333333,"timeout":null},{"keyi":41,"wave":"triangle","time":45.629333333333335,"timeout":null},{"keyi":43,"wave":"triangle","time":45.808,"timeout":null},{"keyi":43,"wave":"triangle","time":46.31999999999999,"timeout":null},{"keyi":43,"wave":"triangle","time":46.58933333333333,"timeout":null},{"keyi":37,"wave":"triangle","time":47.208,"timeout":null},{"keyi":37,"wave":"triangle","time":47.528000000000006,"timeout":null},{"keyi":39,"wave":"triangle","time":48.128,"timeout":null},{"keyi":39,"wave":"triangle","time":48.498666666666665,"timeout":null},{"keyi":41,"wave":"triangle","time":49.007999999999996,"timeout":null},{"keyi":41,"wave":"triangle","time":49.37866666666666,"timeout":null},{"keyi":41,"wave":"triangle","time":49.89866666666667,"timeout":null},{"keyi":41,"wave":"triangle","time":50.239999999999995,"timeout":null},{"keyi":41,"wave":"triangle","time":50.848,"timeout":null},{"keyi":41,"wave":"triangle","time":51.16,"timeout":null},{"keyi":41,"wave":"triangle","time":51.760000000000005,"timeout":null},{"keyi":41,"wave":"triangle","time":52.048,"timeout":null},{"keyi":41,"wave":"triangle","time":52.58933333333333,"timeout":null},{"keyi":39,"wave":"triangle","time":52.848,"timeout":null},{"keyi":39,"wave":"triangle","time":53.37866666666666,"timeout":null},{"keyi":37,"wave":"triangle","time":53.72,"timeout":null},{"keyi":39,"wave":"triangle","time":54.25866666666667,"timeout":null},{"keyi":39,"wave":"triangle","time":54.46933333333334,"timeout":null},{"keyi":36,"wave":"triangle","time":57.09866666666666,"timeout":null},{"keyi":36,"wave":"triangle","time":57.33866666666667,"timeout":null},{"keyi":37,"wave":"triangle","time":57.608000000000004,"timeout":null},{"keyi":37,"wave":"triangle","time":58.208,"timeout":null},{"keyi":37,"wave":"triangle","time":58.50933333333333,"timeout":null},{"keyi":37,"wave":"triangle","time":59.087999999999994,"timeout":null},{"keyi":39,"wave":"triangle","time":59.29866666666666,"timeout":null},{"keyi":39,"wave":"triangle","time":59.61866666666667,"timeout":null},{"keyi":39,"wave":"triangle","time":60.01866666666666,"timeout":null},{"keyi":41,"wave":"triangle","time":60.120000000000005,"timeout":null},{"keyi":37,"wave":"triangle","time":60.688,"timeout":null},{"keyi":41,"wave":"triangle","time":61.10933333333334,"timeout":null},{"keyi":41,"wave":"triangle","time":61.72,"timeout":null},{"keyi":41,"wave":"triangle","time":62.05866666666667,"timeout":null},{"keyi":41,"wave":"triangle","time":62.727999999999994,"timeout":null},{"keyi":43,"wave":"triangle","time":63.03999999999999,"timeout":null},{"keyi":43,"wave":"triangle","time":63.367999999999995,"timeout":null},{"keyi":43,"wave":"triangle","time":63.778666666666666,"timeout":null},{"keyi":43,"wave":"triangle","time":64.14933333333333,"timeout":null},{"keyi":43,"wave":"triangle","time":64.928,"timeout":null},{"keyi":43,"wave":"triangle","time":65.30933333333333,"timeout":null},{"keyi":43,"wave":"triangle","time":65.94933333333333,"timeout":null},{"keyi":44,"wave":"triangle","time":66.208,"timeout":null},{"keyi":44,"wave":"triangle","time":66.81866666666667,"timeout":null},{"keyi":44,"wave":"triangle","time":67.16,"timeout":null},{"keyi":43,"wave":"triangle","time":67.54933333333334,"timeout":null},{"keyi":43,"wave":"triangle","time":68.2,"timeout":null},{"keyi":39,"wave":"triangle","time":68.44,"timeout":null},{"keyi":39,"wave":"triangle","time":69.22933333333333,"timeout":null},{"keyi":32,"wave":"triangle","time":69.98933333333333,"timeout":null},{"keyi":37,"wave":"triangle","time":70.96,"timeout":null},{"keyi":39,"wave":"triangle","time":71.30933333333333,"timeout":null},{"keyi":39,"wave":"triangle","time":72.18933333333334,"timeout":null},{"keyi":39,"wave":"triangle","time":73.888,"timeout":null},{"keyi":37,"wave":"triangle","time":74.45866666666666,"timeout":null},{"keyi":36,"wave":"triangle","time":74.62933333333334,"timeout":null},{"keyi":36,"wave":"triangle","time":75.54933333333334,"timeout":null},{"keyi":36,"wave":"triangle","time":77.14933333333333,"timeout":null},{"keyi":41,"wave":"triangle","time":77.72,"timeout":null},{"keyi":43,"wave":"triangle","time":78.09866666666666,"timeout":null},{"keyi":43,"wave":"triangle","time":79.008,"timeout":null},{"keyi":43,"wave":"triangle","time":80.58933333333333,"timeout":null},{"keyi":39,"wave":"triangle","time":81.18933333333334,"timeout":null},{"keyi":37,"wave":"triangle","time":81.42933333333333,"timeout":null},{"keyi":39,"wave":"triangle","time":82.49866666666667,"timeout":null},{"keyi":37,"wave":"triangle","time":82.78933333333333,"timeout":null},{"keyi":36,"wave":"triangle","time":83.08,"timeout":null},{"keyi":34,"wave":"triangle","time":84.328,"timeout":null},{"keyi":34,"wave":"triangle","time":85.13866666666667,"timeout":null}],
        [{"keyi":56,"wave":"triangle","time":0,"timeout":null},{"keyi":60,"wave":"triangle","time":0.21066666666672518,"timeout":null},{"keyi":63,"wave":"triangle","time":0.42933333333337487,"timeout":null},{"keyi":56,"wave":"triangle","time":0.6186666666667406,"timeout":null},{"keyi":60,"wave":"triangle","time":0.8506666666667115,"timeout":null},{"keyi":63,"wave":"triangle","time":1.0293333333333976,"timeout":null},{"keyi":56,"wave":"triangle","time":1.240000000000009,"timeout":null},{"keyi":60,"wave":"triangle","time":1.4293333333333749,"timeout":null},{"keyi":56,"wave":"triangle","time":1.650666666666666,"timeout":null},{"keyi":60,"wave":"triangle","time":1.8586666666667497,"timeout":null},{"keyi":63,"wave":"triangle","time":2.080000000000041,"timeout":null},{"keyi":68,"wave":"triangle","time":2.2693333333334067,"timeout":null},{"keyi":63,"wave":"triangle","time":2.458666666666659,"timeout":null},{"keyi":60,"wave":"triangle","time":2.6586666666667043,"timeout":null},{"keyi":56,"wave":"triangle","time":2.8693333333334294,"timeout":null},{"keyi":60,"wave":"triangle","time":3.0400000000000773,"timeout":null},{"keyi":53,"wave":"triangle","time":3.3093333333333703,"timeout":null},{"keyi":56,"wave":"triangle","time":3.509333333333416,"timeout":null},{"keyi":60,"wave":"triangle","time":3.6906666666667434,"timeout":null},{"keyi":56,"wave":"triangle","time":3.8986666666667134,"timeout":null},{"keyi":53,"wave":"triangle","time":4.082666666666682,"timeout":null},{"keyi":56,"wave":"triangle","time":4.290666666666766,"timeout":null},{"keyi":53,"wave":"triangle","time":4.490666666666698,"timeout":null},{"keyi":68,"wave":"triangle","time":4.698666666666668,"timeout":null},{"keyi":56,"wave":"triangle","time":4.978666666666754,"timeout":null},{"keyi":53,"wave":"triangle","time":5.229333333333329,"timeout":null},{"keyi":56,"wave":"triangle","time":5.4693333333333385,"timeout":null},{"keyi":53,"wave":"triangle","time":5.680000000000064,"timeout":null},{"keyi":60,"wave":"triangle","time":5.909333333333393,"timeout":null},{"keyi":56,"wave":"triangle","time":6.130666666666684,"timeout":null},{"keyi":53,"wave":"triangle","time":6.349333333333334,"timeout":null},{"keyi":56,"wave":"triangle","time":6.509333333333416,"timeout":null},{"keyi":51,"wave":"triangle","time":6.738666666666745,"timeout":null},{"keyi":55,"wave":"triangle","time":6.949333333333357,"timeout":null},{"keyi":58,"wave":"triangle","time":7.1200000000000045,"timeout":null},{"keyi":51,"wave":"triangle","time":7.370666666666693,"timeout":null},{"keyi":55,"wave":"triangle","time":7.560000000000059,"timeout":null},{"keyi":58,"wave":"triangle","time":7.778666666666709,"timeout":null},{"keyi":51,"wave":"triangle","time":8,"timeout":null},{"keyi":55,"wave":"triangle","time":8.200000000000045,"timeout":null},{"keyi":68,"wave":"triangle","time":8.469333333333338,"timeout":null},{"keyi":55,"wave":"triangle","time":8.850666666666712,"timeout":null},{"keyi":51,"wave":"triangle","time":9.069333333333361,"timeout":null},{"keyi":58,"wave":"triangle","time":9.490666666666698,"timeout":null},{"keyi":55,"wave":"triangle","time":9.690666666666743,"timeout":null},{"keyi":51,"wave":"triangle","time":9.890666666666675,"timeout":null},{"keyi":49,"wave":"triangle","time":10.160000000000082,"timeout":null},{"keyi":53,"wave":"triangle","time":10.389333333333411,"timeout":null},{"keyi":56,"wave":"triangle","time":10.589333333333343,"timeout":null},{"keyi":49,"wave":"triangle","time":10.789333333333389,"timeout":null},{"keyi":53,"wave":"triangle","time":10.960000000000036,"timeout":null},{"keyi":56,"wave":"triangle","time":11.189333333333366,"timeout":null},{"keyi":49,"wave":"triangle","time":11.410666666666657,"timeout":null},{"keyi":53,"wave":"triangle","time":11.600000000000023,"timeout":null},{"keyi":56,"wave":"triangle","time":11.778666666666709,"timeout":null},{"keyi":49,"wave":"triangle","time":12.029333333333398,"timeout":null},{"keyi":53,"wave":"triangle","time":12.200000000000045,"timeout":null},{"keyi":56,"wave":"triangle","time":12.389333333333411,"timeout":null},{"keyi":49,"wave":"triangle","time":12.62933333333342,"timeout":null},{"keyi":44,"wave":"triangle","time":13.109333333333325,"timeout":null},{"keyi":56,"wave":"triangle","time":13.738666666666745,"timeout":null},{"keyi":60,"wave":"triangle","time":14.210666666666725,"timeout":null},{"keyi":56,"wave":"triangle","time":14.450666666666734,"timeout":null},{"keyi":58,"wave":"triangle","time":14.509333333333416,"timeout":null},{"keyi":56,"wave":"triangle","time":14.909333333333393,"timeout":null},{"keyi":44,"wave":"triangle","time":15.62933333333342,"timeout":null},{"keyi":60,"wave":"triangle","time":16.160000000000082,"timeout":null},{"keyi":58,"wave":"triangle","time":16.33066666666673,"timeout":null},{"keyi":56,"wave":"triangle","time":16.568000000000097,"timeout":null},{"keyi":44,"wave":"triangle","time":16.840000000000032,"timeout":null},{"keyi":60,"wave":"triangle","time":17.418666666666695,"timeout":null},{"keyi":58,"wave":"triangle","time":17.879999999999995,"timeout":null},{"keyi":56,"wave":"triangle","time":18.109333333333325,"timeout":null},{"keyi":44,"wave":"triangle","time":18.54933333333338,"timeout":null},{"keyi":60,"wave":"triangle","time":19.200000000000045,"timeout":null},{"keyi":58,"wave":"triangle","time":19.650666666666666,"timeout":null},{"keyi":56,"wave":"triangle","time":19.879999999999995,"timeout":null},{"keyi":44,"wave":"triangle","time":20.09866666666676,"timeout":null},{"keyi":53,"wave":"triangle","time":20.32000000000005,"timeout":null},{"keyi":53,"wave":"triangle","time":20.749333333333425,"timeout":null},{"keyi":56,"wave":"triangle","time":21.029333333333398,"timeout":null},{"keyi":55,"wave":"triangle","time":21.480000000000018,"timeout":null},{"keyi":53,"wave":"triangle","time":21.669333333333384,"timeout":null},{"keyi":56,"wave":"triangle","time":21.898666666666713,"timeout":null},{"keyi":60,"wave":"triangle","time":22.130666666666684,"timeout":null},{"keyi":56,"wave":"triangle","time":22.54933333333338,"timeout":null},{"keyi":53,"wave":"triangle","time":22.78933333333339,"timeout":null},{"keyi":56,"wave":"triangle","time":23.189333333333366,"timeout":null},{"keyi":53,"wave":"triangle","time":23.410666666666657,"timeout":null},{"keyi":56,"wave":"triangle","time":23.600000000000023,"timeout":null},{"keyi":51,"wave":"triangle","time":23.829333333333352,"timeout":null},{"keyi":55,"wave":"triangle","time":24.06933333333336,"timeout":null},{"keyi":58,"wave":"triangle","time":24.25066666666669,"timeout":null},{"keyi":51,"wave":"triangle","time":24.498666666666736,"timeout":null},{"keyi":53,"wave":"triangle","time":25.130666666666684,"timeout":null},{"keyi":58,"wave":"triangle","time":25.610666666666702,"timeout":null},{"keyi":53,"wave":"triangle","time":25.898666666666713,"timeout":null},{"keyi":51,"wave":"triangle","time":26.25066666666669,"timeout":null},{"keyi":53,"wave":"triangle","time":26.639999999999986,"timeout":null},{"keyi":51,"wave":"triangle","time":26.879999999999995,"timeout":null},{"keyi":58,"wave":"triangle","time":27.109333333333325,"timeout":null},{"keyi":49,"wave":"triangle","time":27.33066666666673,"timeout":null},{"keyi":53,"wave":"triangle","time":27.77866666666671,"timeout":null},{"keyi":56,"wave":"triangle","time":28.09066666666672,"timeout":null},{"keyi":49,"wave":"triangle","time":28.520000000000095,"timeout":null},{"keyi":53,"wave":"triangle","time":28.749333333333425,"timeout":null},{"keyi":56,"wave":"triangle","time":28.909333333333393,"timeout":null},{"keyi":49,"wave":"triangle","time":29.138666666666722,"timeout":null},{"keyi":53,"wave":"triangle","time":29.33066666666673,"timeout":null},{"keyi":56,"wave":"triangle","time":29.57066666666674,"timeout":null},{"keyi":49,"wave":"triangle","time":29.78933333333339,"timeout":null},{"keyi":53,"wave":"triangle","time":30.01066666666668,"timeout":null},{"keyi":56,"wave":"triangle","time":30.200000000000045,"timeout":null},{"keyi":49,"wave":"triangle","time":30.418666666666695,"timeout":null},{"keyi":44,"wave":"triangle","time":30.810666666666748,"timeout":null},{"keyi":56,"wave":"triangle","time":31.33066666666673,"timeout":null},{"keyi":60,"wave":"triangle","time":31.800000000000068,"timeout":null},{"keyi":60,"wave":"triangle","time":32.04000000000008,"timeout":null},{"keyi":68,"wave":"triangle","time":32.33066666666673,"timeout":null},{"keyi":60,"wave":"triangle","time":32.92000000000007,"timeout":null},{"keyi":56,"wave":"triangle","time":33.53066666666666,"timeout":null},{"keyi":44,"wave":"triangle","time":33.970666666666716,"timeout":null},{"keyi":56,"wave":"triangle","time":34.57066666666674,"timeout":null},{"keyi":60,"wave":"triangle","time":35.200000000000045,"timeout":null},{"keyi":68,"wave":"triangle","time":35.61866666666674,"timeout":null},{"keyi":60,"wave":"triangle","time":36,"timeout":null},{"keyi":56,"wave":"triangle","time":36.25066666666669,"timeout":null},{"keyi":68,"wave":"triangle","time":36.639999999999986,"timeout":null},{"keyi":60,"wave":"triangle","time":36.85066666666671,"timeout":null},{"keyi":56,"wave":"triangle","time":37.09066666666672,"timeout":null},{"keyi":68,"wave":"triangle","time":37.32000000000005,"timeout":null},{"keyi":53,"wave":"triangle","time":37.54933333333338,"timeout":null},{"keyi":58,"wave":"triangle","time":37.77066666666667,"timeout":null},{"keyi":53,"wave":"triangle","time":38,"timeout":null},{"keyi":58,"wave":"triangle","time":38.109333333333325,"timeout":null},{"keyi":68,"wave":"triangle","time":38.21866666666676,"timeout":null},{"keyi":56,"wave":"triangle","time":38.45866666666666,"timeout":null},{"keyi":68,"wave":"triangle","time":38.669333333333384,"timeout":null},{"keyi":53,"wave":"triangle","time":38.90933333333339,"timeout":null},{"keyi":58,"wave":"triangle","time":39.09866666666676,"timeout":null},{"keyi":53,"wave":"triangle","time":39.32000000000005,"timeout":null},{"keyi":68,"wave":"triangle","time":39.520000000000095,"timeout":null},{"keyi":56,"wave":"triangle","time":39.680000000000064,"timeout":null},{"keyi":53,"wave":"triangle","time":40.189333333333366,"timeout":null},{"keyi":58,"wave":"triangle","time":40.41066666666666,"timeout":null},{"keyi":68,"wave":"triangle","time":40.62933333333342,"timeout":null},{"keyi":51,"wave":"triangle","time":40.85866666666675,"timeout":null},{"keyi":55,"wave":"triangle","time":41.09066666666672,"timeout":null},{"keyi":58,"wave":"triangle","time":41.25066666666669,"timeout":null},{"keyi":51,"wave":"triangle","time":41.509333333333416,"timeout":null},{"keyi":53,"wave":"triangle","time":41.69066666666674,"timeout":null},{"keyi":58,"wave":"triangle","time":41.93066666666675,"timeout":null},{"keyi":53,"wave":"triangle","time":42.16000000000008,"timeout":null},{"keyi":51,"wave":"triangle","time":42.37866666666673,"timeout":null},{"keyi":51,"wave":"triangle","time":42.749333333333425,"timeout":null},{"keyi":55,"wave":"triangle","time":42.978666666666754,"timeout":null},{"keyi":58,"wave":"triangle","time":43.38933333333341,"timeout":null},{"keyi":51,"wave":"triangle","time":43.61866666666674,"timeout":null},{"keyi":55,"wave":"triangle","time":43.81866666666667,"timeout":null},{"keyi":49,"wave":"triangle","time":44.09066666666672,"timeout":null},{"keyi":53,"wave":"triangle","time":44.29866666666669,"timeout":null},{"keyi":56,"wave":"triangle","time":44.520000000000095,"timeout":null},{"keyi":49,"wave":"triangle","time":44.69866666666667,"timeout":null},{"keyi":51,"wave":"triangle","time":44.92000000000007,"timeout":null},{"keyi":56,"wave":"triangle","time":45.1493333333334,"timeout":null},{"keyi":49,"wave":"triangle","time":45.440000000000055,"timeout":null},{"keyi":51,"wave":"triangle","time":45.650666666666666,"timeout":null},{"keyi":56,"wave":"triangle","time":45.86933333333343,"timeout":null},{"keyi":49,"wave":"triangle","time":46.09866666666676,"timeout":null},{"keyi":51,"wave":"triangle","time":46.29866666666669,"timeout":null},{"keyi":56,"wave":"triangle","time":46.54933333333338,"timeout":null},{"keyi":49,"wave":"triangle","time":46.81066666666675,"timeout":null},{"keyi":51,"wave":"triangle","time":47.01866666666672,"timeout":null},{"keyi":56,"wave":"triangle","time":47.25066666666669,"timeout":null},{"keyi":49,"wave":"triangle","time":47.5680000000001,"timeout":null},{"keyi":51,"wave":"triangle","time":47.94933333333336,"timeout":null},{"keyi":56,"wave":"triangle","time":48.429333333333375,"timeout":null},{"keyi":44,"wave":"triangle","time":49.09866666666676,"timeout":null},{"keyi":56,"wave":"triangle","time":49.62933333333342,"timeout":null},{"keyi":60,"wave":"triangle","time":50.26933333333341,"timeout":null},{"keyi":63,"wave":"triangle","time":50.978666666666754,"timeout":null},{"keyi":68,"wave":"triangle","time":51.89866666666671,"timeout":null},{"keyi":44,"wave":"triangle","time":53.73066666666671,"timeout":null}],
        [{"keyi":43,"wave":"triangle","time":0,"timeout":null},{"keyi":43,"wave":"triangle","time":0.1999999999999993,"timeout":null},{"keyi":43,"wave":"triangle","time":0.879999999999999,"timeout":null},{"keyi":43,"wave":"triangle","time":1.5386666666666642,"timeout":null},{"keyi":44,"wave":"triangle","time":1.7680000000000007,"timeout":null},{"keyi":44,"wave":"triangle","time":2.2586666666666666,"timeout":null},{"keyi":39,"wave":"triangle","time":2.84,"timeout":null},{"keyi":41,"wave":"triangle","time":3.3599999999999994,"timeout":null},{"keyi":41,"wave":"triangle","time":4.069333333333333,"timeout":null},{"keyi":41,"wave":"triangle","time":4.407999999999998,"timeout":null},{"keyi":43,"wave":"triangle","time":4.959999999999997,"timeout":null},{"keyi":43,"wave":"triangle","time":5.32,"timeout":null},{"keyi":43,"wave":"triangle","time":6.007999999999999,"timeout":null},{"keyi":43,"wave":"triangle","time":6.279999999999998,"timeout":null},{"keyi":43,"wave":"triangle","time":7.338666666666665,"timeout":null},{"keyi":43,"wave":"triangle","time":7.648,"timeout":null},{"keyi":43,"wave":"triangle","time":8.058666666666667,"timeout":null},{"keyi":43,"wave":"triangle","time":8.559999999999999,"timeout":null},{"keyi":41,"wave":"triangle","time":9,"timeout":null},{"keyi":41,"wave":"triangle","time":9.36,"timeout":null},{"keyi":39,"wave":"triangle","time":9.719999999999999,"timeout":null},{"keyi":41,"wave":"triangle","time":10.168,"timeout":null},{"keyi":41,"wave":"triangle","time":10.527999999999999,"timeout":null},{"keyi":36,"wave":"triangle","time":13.218666666666664,"timeout":null},{"keyi":41,"wave":"triangle","time":13.648,"timeout":null},{"keyi":41,"wave":"triangle","time":14.280000000000001,"timeout":null},{"keyi":41,"wave":"triangle","time":14.629333333333335,"timeout":null},{"keyi":43,"wave":"triangle","time":15.207999999999998,"timeout":null},{"keyi":43,"wave":"triangle","time":15.469333333333331,"timeout":null},{"keyi":43,"wave":"triangle","time":15.839999999999996,"timeout":null},{"keyi":44,"wave":"triangle","time":16.029333333333334,"timeout":null},{"keyi":44,"wave":"triangle","time":16.378666666666668,"timeout":null},{"keyi":46,"wave":"triangle","time":16.858666666666664,"timeout":null},{"keyi":46,"wave":"triangle","time":17.14933333333333,"timeout":null},{"keyi":46,"wave":"triangle","time":17.759999999999998,"timeout":null},{"keyi":46,"wave":"triangle","time":18.349333333333334,"timeout":null},{"keyi":46,"wave":"triangle","time":18.567999999999998,"timeout":null},{"keyi":46,"wave":"triangle","time":18.799999999999997,"timeout":null},{"keyi":48,"wave":"triangle","time":19.08,"timeout":null},{"keyi":48,"wave":"triangle","time":19.65866666666667,"timeout":null},{"keyi":48,"wave":"triangle","time":19.967999999999996,"timeout":null},{"keyi":48,"wave":"triangle","time":20.498666666666665,"timeout":null},{"keyi":48,"wave":"triangle","time":20.858666666666664,"timeout":null},{"keyi":48,"wave":"triangle","time":21.138666666666666,"timeout":null},{"keyi":48,"wave":"triangle","time":21.408,"timeout":null},{"keyi":48,"wave":"triangle","time":21.78933333333333,"timeout":null},{"keyi":48,"wave":"triangle","time":22.119999999999997,"timeout":null},{"keyi":44,"wave":"triangle","time":22.560000000000002,"timeout":null},{"keyi":43,"wave":"triangle","time":23.538666666666664,"timeout":null},{"keyi":43,"wave":"triangle","time":23.82933333333333,"timeout":null},{"keyi":41,"wave":"triangle","time":24.528,"timeout":null},{"keyi":36,"wave":"triangle","time":26.218666666666664,"timeout":null},{"keyi":37,"wave":"triangle","time":26.54933333333333,"timeout":null},{"keyi":41,"wave":"triangle","time":27.28,"timeout":null},{"keyi":41,"wave":"triangle","time":28.069333333333333,"timeout":null},{"keyi":41,"wave":"triangle","time":29.578666666666663,"timeout":null},{"keyi":37,"wave":"triangle","time":30.309333333333335,"timeout":null},{"keyi":36,"wave":"triangle","time":30.629333333333335,"timeout":null},{"keyi":36,"wave":"triangle","time":31.439999999999998,"timeout":null},{"keyi":36,"wave":"triangle","time":33.04,"timeout":null},{"keyi":41,"wave":"triangle","time":33.57866666666666,"timeout":null},{"keyi":43,"wave":"triangle","time":33.86933333333333,"timeout":null},{"keyi":43,"wave":"triangle","time":34.6,"timeout":null},{"keyi":43,"wave":"triangle","time":36.33866666666667,"timeout":null},{"keyi":41,"wave":"triangle","time":37.007999999999996,"timeout":null},{"keyi":36,"wave":"triangle","time":37.32,"timeout":null},{"keyi":41,"wave":"triangle","time":38.33866666666667,"timeout":null},{"keyi":36,"wave":"triangle","time":38.669333333333334,"timeout":null},{"keyi":34,"wave":"triangle","time":39.007999999999996,"timeout":null},{"keyi":32,"wave":"triangle","time":40.10933333333333,"timeout":null},{"keyi":32,"wave":"triangle","time":40.93866666666666,"timeout":null},{"keyi":36,"wave":"triangle","time":43.688,"timeout":null},{"keyi":41,"wave":"triangle","time":44.138666666666666,"timeout":null},{"keyi":41,"wave":"triangle","time":44.888,"timeout":null},{"keyi":41,"wave":"triangle","time":45.14933333333333,"timeout":null},{"keyi":41,"wave":"triangle","time":45.629333333333335,"timeout":null},{"keyi":43,"wave":"triangle","time":45.808,"timeout":null},{"keyi":43,"wave":"triangle","time":46.31999999999999,"timeout":null},{"keyi":43,"wave":"triangle","time":46.58933333333333,"timeout":null},{"keyi":37,"wave":"triangle","time":47.208,"timeout":null},{"keyi":37,"wave":"triangle","time":47.528000000000006,"timeout":null},{"keyi":39,"wave":"triangle","time":48.128,"timeout":null},{"keyi":39,"wave":"triangle","time":48.498666666666665,"timeout":null},{"keyi":41,"wave":"triangle","time":49.007999999999996,"timeout":null},{"keyi":41,"wave":"triangle","time":49.37866666666666,"timeout":null},{"keyi":41,"wave":"triangle","time":49.89866666666667,"timeout":null},{"keyi":41,"wave":"triangle","time":50.239999999999995,"timeout":null},{"keyi":41,"wave":"triangle","time":50.848,"timeout":null},{"keyi":41,"wave":"triangle","time":51.16,"timeout":null},{"keyi":41,"wave":"triangle","time":51.760000000000005,"timeout":null},{"keyi":41,"wave":"triangle","time":52.048,"timeout":null},{"keyi":41,"wave":"triangle","time":52.58933333333333,"timeout":null},{"keyi":39,"wave":"triangle","time":52.848,"timeout":null},{"keyi":39,"wave":"triangle","time":53.37866666666666,"timeout":null},{"keyi":37,"wave":"triangle","time":53.72,"timeout":null},{"keyi":39,"wave":"triangle","time":54.25866666666667,"timeout":null},{"keyi":39,"wave":"triangle","time":54.46933333333334,"timeout":null},{"keyi":36,"wave":"triangle","time":57.09866666666666,"timeout":null},{"keyi":36,"wave":"triangle","time":57.33866666666667,"timeout":null},{"keyi":37,"wave":"triangle","time":57.608000000000004,"timeout":null},{"keyi":37,"wave":"triangle","time":58.208,"timeout":null},{"keyi":37,"wave":"triangle","time":58.50933333333333,"timeout":null},{"keyi":37,"wave":"triangle","time":59.087999999999994,"timeout":null},{"keyi":39,"wave":"triangle","time":59.29866666666666,"timeout":null},{"keyi":39,"wave":"triangle","time":59.61866666666667,"timeout":null},{"keyi":39,"wave":"triangle","time":60.01866666666666,"timeout":null},{"keyi":41,"wave":"triangle","time":60.120000000000005,"timeout":null},{"keyi":37,"wave":"triangle","time":60.688,"timeout":null},{"keyi":41,"wave":"triangle","time":61.10933333333334,"timeout":null},{"keyi":41,"wave":"triangle","time":61.72,"timeout":null},{"keyi":41,"wave":"triangle","time":62.05866666666667,"timeout":null},{"keyi":41,"wave":"triangle","time":62.727999999999994,"timeout":null},{"keyi":43,"wave":"triangle","time":63.03999999999999,"timeout":null},{"keyi":43,"wave":"triangle","time":63.367999999999995,"timeout":null},{"keyi":43,"wave":"triangle","time":63.778666666666666,"timeout":null},{"keyi":43,"wave":"triangle","time":64.14933333333333,"timeout":null},{"keyi":43,"wave":"triangle","time":64.928,"timeout":null},{"keyi":43,"wave":"triangle","time":65.30933333333333,"timeout":null},{"keyi":43,"wave":"triangle","time":65.94933333333333,"timeout":null},{"keyi":44,"wave":"triangle","time":66.208,"timeout":null},{"keyi":44,"wave":"triangle","time":66.81866666666667,"timeout":null},{"keyi":44,"wave":"triangle","time":67.16,"timeout":null},{"keyi":43,"wave":"triangle","time":67.54933333333334,"timeout":null},{"keyi":43,"wave":"triangle","time":68.2,"timeout":null},{"keyi":39,"wave":"triangle","time":68.44,"timeout":null},{"keyi":39,"wave":"triangle","time":69.22933333333333,"timeout":null},{"keyi":32,"wave":"triangle","time":69.98933333333333,"timeout":null},{"keyi":37,"wave":"triangle","time":70.96,"timeout":null},{"keyi":39,"wave":"triangle","time":71.30933333333333,"timeout":null},{"keyi":39,"wave":"triangle","time":72.18933333333334,"timeout":null},{"keyi":39,"wave":"triangle","time":73.888,"timeout":null},{"keyi":37,"wave":"triangle","time":74.45866666666666,"timeout":null},{"keyi":36,"wave":"triangle","time":74.62933333333334,"timeout":null},{"keyi":36,"wave":"triangle","time":75.54933333333334,"timeout":null},{"keyi":36,"wave":"triangle","time":77.14933333333333,"timeout":null},{"keyi":41,"wave":"triangle","time":77.72,"timeout":null},{"keyi":43,"wave":"triangle","time":78.09866666666666,"timeout":null},{"keyi":43,"wave":"triangle","time":79.008,"timeout":null},{"keyi":43,"wave":"triangle","time":80.58933333333333,"timeout":null},{"keyi":39,"wave":"triangle","time":81.18933333333334,"timeout":null},{"keyi":37,"wave":"triangle","time":81.42933333333333,"timeout":null},{"keyi":39,"wave":"triangle","time":82.49866666666667,"timeout":null},{"keyi":37,"wave":"triangle","time":82.78933333333333,"timeout":null},{"keyi":36,"wave":"triangle","time":83.08,"timeout":null},{"keyi":34,"wave":"triangle","time":84.328,"timeout":null},{"keyi":34,"wave":"triangle","time":85.13866666666667,"timeout":null}],
        [{"keyi":36,"wave":"triangle","time":0,"timeout":null},{"keyi":36,"wave":"triangle","time":0.3813333333333446,"timeout":null},{"keyi":37,"wave":"triangle","time":0.7706666666666706,"timeout":null},{"keyi":39,"wave":"triangle","time":1.1706666666666763,"timeout":null},{"keyi":39,"wave":"triangle","time":1.5413333333333412,"timeout":null},{"keyi":37,"wave":"triangle","time":1.941333333333347,"timeout":null},{"keyi":36,"wave":"triangle","time":2.301333333333332,"timeout":null},{"keyi":34,"wave":"triangle","time":2.650666666666666,"timeout":null},{"keyi":32,"wave":"triangle","time":3.069333333333333,"timeout":null},{"keyi":32,"wave":"triangle","time":3.4693333333333385,"timeout":null},{"keyi":34,"wave":"triangle","time":3.9013333333333264,"timeout":null},{"keyi":36,"wave":"triangle","time":4.25066666666666,"timeout":null},{"keyi":36,"wave":"triangle","time":4.650666666666666,"timeout":null},{"keyi":34,"wave":"triangle","time":5.319999999999993,"timeout":null},{"keyi":34,"wave":"triangle","time":5.52000000000001,"timeout":null},{"keyi":36,"wave":"triangle","time":6.290666666666681,"timeout":null},{"keyi":36,"wave":"triangle","time":6.650666666666666,"timeout":null},{"keyi":37,"wave":"triangle","time":7.039999999999992,"timeout":null},{"keyi":39,"wave":"triangle","time":7.410666666666657,"timeout":null},{"keyi":39,"wave":"triangle","time":7.800000000000011,"timeout":null},{"keyi":37,"wave":"triangle","time":8.181333333333328,"timeout":null},{"keyi":36,"wave":"triangle","time":8.560000000000002,"timeout":null},{"keyi":34,"wave":"triangle","time":8.909333333333336,"timeout":null},{"keyi":32,"wave":"triangle","time":9.309333333333342,"timeout":null},{"keyi":32,"wave":"triangle","time":9.680000000000007,"timeout":null},{"keyi":34,"wave":"triangle","time":10.050666666666672,"timeout":null},{"keyi":36,"wave":"triangle","time":10.421333333333337,"timeout":null},{"keyi":34,"wave":"triangle","time":10.850666666666655,"timeout":null},{"keyi":32,"wave":"triangle","time":11.389333333333326,"timeout":null},{"keyi":32,"wave":"triangle","time":11.581333333333333,"timeout":null},{"keyi":34,"wave":"triangle","time":12.319999999999993,"timeout":null},{"keyi":34,"wave":"triangle","time":12.701333333333338,"timeout":null},{"keyi":36,"wave":"triangle","time":13.109333333333325,"timeout":null},{"keyi":32,"wave":"triangle","time":13.469333333333338,"timeout":null},{"keyi":34,"wave":"triangle","time":13.840000000000003,"timeout":null},{"keyi":36,"wave":"triangle","time":14.199999999999989,"timeout":null},{"keyi":37,"wave":"triangle","time":14.389333333333326,"timeout":null},{"keyi":36,"wave":"triangle","time":14.570666666666654,"timeout":null},{"keyi":32,"wave":"triangle","time":15,"timeout":null},{"keyi":34,"wave":"triangle","time":15.389333333333326,"timeout":null},{"keyi":36,"wave":"triangle","time":15.759999999999991,"timeout":null},{"keyi":37,"wave":"triangle","time":15.981333333333339,"timeout":null},{"keyi":36,"wave":"triangle","time":16.141333333333336,"timeout":null},{"keyi":34,"wave":"triangle","time":16.50933333333333,"timeout":null},{"keyi":32,"wave":"triangle","time":16.869333333333344,"timeout":null},{"keyi":34,"wave":"triangle","time":17.25066666666666,"timeout":null},{"keyi":27,"wave":"triangle","time":17.640000000000015,"timeout":null},{"keyi":36,"wave":"triangle","time":18.439999999999998,"timeout":null},{"keyi":36,"wave":"triangle","time":18.829333333333324,"timeout":null},{"keyi":37,"wave":"triangle","time":19.21066666666667,"timeout":null},{"keyi":39,"wave":"triangle","time":19.629333333333335,"timeout":null},{"keyi":39,"wave":"triangle","time":20,"timeout":null},{"keyi":37,"wave":"triangle","time":20.370666666666665,"timeout":null},{"keyi":36,"wave":"triangle","time":20.72,"timeout":null},{"keyi":34,"wave":"triangle","time":21.090666666666664,"timeout":null},{"keyi":32,"wave":"triangle","time":21.48533333333333,"timeout":null},{"keyi":32,"wave":"triangle","time":21.861333333333334,"timeout":null},{"keyi":34,"wave":"triangle","time":22.221333333333348,"timeout":null},{"keyi":36,"wave":"triangle","time":22.610666666666674,"timeout":null},{"keyi":34,"wave":"triangle","time":23.02133333333333,"timeout":null},{"keyi":32,"wave":"triangle","time":23.581333333333333,"timeout":null},{"keyi":32,"wave":"triangle","time":23.80000000000001,"timeout":null}]
    ],
    initialTime: 0,

    /* helper functions */
    newcss: function() {
        piano.css.innerHTML = `
            #piano-ui {
                background: linear-gradient(transparent, rgba(64, 64, 64, 0.5));
                color: black;
                font-family: Avenir, Klee, Helvetica, Arial, sans-serif;
                font-size: 14px;
                position: fixed;
                height: 75px;
                width: 100%;
                left: 0;
                bottom: 0;
                perspective: 1024px;
                z-index: 9999;
            }
            #piano-quit {
                background: rgba(255, 255, 255, 0.5);
                position: absolute;
                width: 30px;
                top: 0;
                right: 0;
                transform: translateY(-100%);
                border-top: 1px solid rgba(64, 64, 64, 0.5);
                border-radius: 10px 10px 0 0;
                text-align: center;
                cursor: pointer;
            }

            .piano-menu {
                height: 100%;
                width: 15%;
                vertical-align: top;
                display: inline-block;
            }
            .piano-menu > label, .piano-menu > input, .piano-menu > select {
                font-size: 14px;
                max-width: 50%;
                float: none;
            }
            #piano-left {
                background: linear-gradient(to right, rgba(255, 255, 255, 0.5), transparent);
                text-align: left;
            }
            #piano-right {
                background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.5));
                text-align: right;
            }
            #piano-middle {
                height: 100%;
                width: 70%;
                bottom: 0;
                transform: translateZ(${piano.tilt.value}px) rotateX(${piano.tilt.value}deg);
                transform-style: preserve-3d;
                display: inline-block;
            }

            .piano-key {
                text-align: center;
                position: relative;
                bottom: 0;
                transform-style: preserve-3d;
                border-radius: 0 0 5px 5px;
                display: inline-block;
            }
            .piano-key:before {
                content: "";
                background: #808080;
                position: absolute;
                height: 100%;
                width: 100%;
                top: 0;
                left: 0;
                transform: translateZ(-6px);
                border-radius: 0 0 5px 5px;
            }
            .piano-white {
                background: white;
                color: black;
                height: 100%;
                width: 3.5%;
                transform: translateZ(7px);
                margin-left: 0.2%;
            }
            .piano-white.piano-hit {
                background: #c0c0c0;
                transform: translateZ(1px);
            }
            .piano-black {
                background: black;
                color: white;
                vertical-align: top;
                height: 70%;
                width: 2%;
                transform: translateX(-55%) translateZ(14px);
                margin-right: -2%;
            }
            .piano-black.piano-hit {
                background: #404040;
                transform: translateX(-55%) translateZ(8px);
            }

            .piano-keyval {
                position: absolute;
                bottom: 0;
                transform: translateX(-50%);
            }
        `;
    },
    newselect: function(p, c, label, options, value, func) {
        options.forEach(function(e) {
            c.appendChild(document.createElement("option")).innerHTML = e;
        });
        c.value = options[value];
        if (func != null) {
            c.addEventListener("input", func);
        }
        p.appendChild(document.createElement("label")).innerHTML = label;
        p.appendChild(c);
    },
    newrange: function(p, c, label, min, step, max, value, func) {
        c.type = "range";
        c.min = min;
        c.step = step;
        c.max = max;
        c.value = value;
        c.min = min;
        c.addEventListener("input", func);
        p.appendChild(document.createElement("label")).innerHTML = label;
        p.appendChild(c);
    },
    newbutton: function(p, label, func) {
        var c = document.createElement("input");
        c.type = "button";
        c.addEventListener("click", func);
        c.value = label;
        p.appendChild(c);
        return c;
    },
    newbr: function(p) {
        p.appendChild(document.createElement("br"));
    },
    keyindex: function(e) {
        var key = e.key.length == 1 ? e.key : e.code;
        return piano.keymap.findIndex(e => e.key == key || e.caps_key == key);
    },

    /* audio functions */
    note: function(i, wave) {
        var vol = piano.audio.createGain();
        vol.connect(piano.audio.destination);
        var osc = piano.audio.createOscillator();
        /* altered version of formula from https://en.wikipedia.org/wiki/Piano_key_frequencies */
        osc.frequency.value = 440 * Math.pow(2, (i - 53) / 12);
        osc.type = wave;
        osc.connect(vol);
        osc.start();
        var secs = 10;
        vol.gain.exponentialRampToValueAtTime(1 / Number.MAX_SAFE_INTEGER, piano.audio.currentTime + secs);
        setTimeout(e => osc.disconnect(), secs * 1000);
        setTimeout(e => vol.disconnect(), secs * 1000);
    },
    playDisc: function(i) {
        piano.disc[i].forEach(function(e, j) {
            e.timeout = setTimeout(function() {
                piano.note(e.keyi, e.wave);
                var domi = e.keyi - piano.pitch.value;
                if (domi >= 0 && domi < 46) {
                    piano.keymap[domi].dom.classList.add("piano-hit");
                    setTimeout(o => piano.keymap[domi].dom.classList.remove("piano-hit"), 100);
                }
                e.timeout = null;
            }, e.time * 1000);
        });
    },
    stopDisc: function(i) {
        piano.disc[i].forEach(function(e) {
            clearTimeout(e.timeout);
            e.timeout = null;
        });
    },
    stopDiscs: function(i) {
        piano.disc.forEach(e => e.forEach(function(o) {
            clearTimeout(o.timeout);
            o.timeout = null;
        }));
    },
    saveDisc: function() {
        piano.disc.push(piano.disc[0]);
        piano.deleteDisc(0);
    },
    deleteDisc: function(i) {
        if (i == 0) {
            piano.disc[i] = [];
        }
        else {
            piano.disc = piano.disc.slice(0, i).concat(piano.disc.slice(i + 1));
        }
        piano.playbackmode();
    },
    exportDiscs: function() {
        piano.disc.forEach(function(e, i) {
            var d = JSON.stringify(e);
            console.log("Disc " + i + "\n" + d);
        });
        alert("Check the console.");
    },

    keyup: function(e) {
        var keyi = piano.keyindex(e);
        if (keyi >= 0) {
            piano.keymap[keyi].pressed = 0;
            piano.keymap[keyi].dom.classList.remove("piano-hit");
        }
    },
    keydown: function(e) {
        e.preventDefault();
        var keyi = piano.keyindex(e);
        /* play notes */
        if (keyi >= 0 && piano.keymap[keyi].pressed == 0) {
            piano.keymap[keyi].pressed = 1;
            var i = keyi + Number(piano.pitch.value);
            piano.note(i, piano.wave.value);
            piano.keymap[keyi].dom.classList.add("piano-hit");
            /* store history */
            if (piano.disc[0].length == 0) {
                piano.initialTime = piano.audio.currentTime;
            }
            piano.disc[0].push({
                keyi: i,
                wave: piano.wave.value,
                time: piano.audio.currentTime - piano.initialTime,
                timeout: null
            });
            if (piano.disc[0].length == 1) {
                Array.from(piano.menuright.getElementsByTagName("input")).slice(0, 3).forEach(e => e.removeAttribute("disabled"));
            }
        }
        /* reset history */
        else if (e.key == " ") {
            piano.stopDiscs();
            piano.deleteDisc(0);
        }
        /* control pitch and tilt */
        else if (e.key == "ArrowLeft") {
            piano.pitch.value = Number(piano.pitch.value) - 12;
        }
        else if (e.key == "ArrowRight") {
            piano.pitch.value = Number(piano.pitch.value) + 12;
        }
        else if (e.key == "ArrowDown") {
            piano.tilt.value = Number(piano.tilt.value) - 5;
            piano.newcss();
        }
        else if (e.key == "ArrowUp") {
            piano.tilt.value = Number(piano.tilt.value) + 5;
            piano.newcss();
        }
    },

    /* right menu */
    playstop: function(e, i) {
        if (piano.disc[i].length > 0) {
            var c = i == 0 ? "↻" : i;
            if (e.target.value == c + " ▶") {
                piano.playDisc(i);
                e.target.value = c + " ◼";
                var lastnote = piano.disc[i].length - 1;
                setTimeout(o => e.target.value = c + " ▶", 1000 * (piano.disc[i][lastnote].time));
            }
            else {
                piano.stopDisc(i);
                e.target.value = c + " ▶";
            }
        }
    },
    playbackmode: function() {
        piano.menuright.innerHTML = "";
        var d1 = piano.newbutton(piano.menuright, "↻ ▶", e => piano.playstop(e, 0));
        var d2 = piano.newbutton(piano.menuright, "⬇", piano.saveDisc);
        if (piano.disc[0].length == 0) {
            d1.setAttribute("disabled", 1);
            d2.setAttribute("disabled", 1);
        }
        var d3 = piano.newbutton(piano.menuright, "✖", piano.deletionmode);
        if (piano.disc.length == 1 && piano.disc[0].length == 0) {
            d3.setAttribute("disabled", 1);
        }
        var d4 = piano.newbutton(piano.menuright, "︎⬆︎", piano.exportDiscs);
        if (piano.disc.length == 1) {
            d4.setAttribute("disabled", 1);
        }
        piano.newbr(piano.menuright);
        piano.disc.forEach(function(e, i) {
            if (i !== 0) {
                if (piano.disc[i].every(e => e.timeout == null)) {
                    piano.newbutton(piano.menuright, i + " ▶", o => piano.playstop(o, i));
                }
                else {
                    piano.newbutton(piano.menuright, i + " ◼", o => piano.playstop(o, i));
                }
            }
        });
    },
    deletionmode: function() {
        piano.stopDiscs();
        piano.menuright.innerHTML = "";
        var d1 = piano.newbutton(piano.menuright, "↻ ✖", e => piano.deleteDisc(0));
        if (piano.disc[0].length == 0) {
            d1.setAttribute("disabled", 1);
        }
        var d2 = piano.newbutton(piano.menuright, "⬇", piano.saveDisc);
        d2.setAttribute("disabled", 1);
        piano.newbutton(piano.menuright, "✖", piano.playbackmode);
        var d3 = piano.newbutton(piano.menuright, "︎⬆︎", piano.exportDiscs);
        d3.setAttribute("disabled", 1);
        piano.newbr(piano.menuright);
        piano.disc.forEach(function(e, i) {
            if (i !== 0) {
                piano.newbutton(piano.menuright, i + " ✖", o => piano.deleteDisc(i));
            }
        });
    },

    /* main */
    quit: function() {
        piano.ui.remove();
        piano.css.remove();
        piano.stopDiscs();
        piano.audio.close();
        document.removeEventListener("keydown", piano.keydown);
        document.removeEventListener("keyup", piano.keyup);
    },
    init: function() {
        /* define styles */
        document.body.appendChild(piano.css);
        /* place main container */
        document.body.appendChild(piano.ui);
        piano.ui.id = "piano-ui";
        var quit = document.createElement("div");
        quit.id = "piano-quit";
        quit.innerHTML = "✕";
        quit.addEventListener("click", piano.quit);
        piano.ui.appendChild(quit);
        /* place ui settings */
        piano.ui.appendChild(piano.menuleft);
        piano.menuleft.className = "piano-menu";
        piano.menuleft.id = "piano-left";
        piano.newselect(piano.menuleft, piano.wave, "Wave: ", ["sine", "triangle", "square", "sawtooth"], 1);
        piano.newbr(piano.menuleft);
        piano.newrange(piano.menuleft, piano.pitch, "Pitch: ", 0, 12, 48, 24, null);
        piano.newbr(piano.menuleft);
        piano.newrange(piano.menuleft, piano.tilt, "Tilt: ", 0, 5, 90, 45, piano.newcss);
        piano.newcss();
        /* place piano */
        piano.ui.appendChild(piano.keyboard);
        piano.keyboard.id = "piano-middle";
        for (var i = 0; i < piano.keymap.length; i++) {
            /* place keys */
            var key = piano.keymap[i].key;
            var dom = piano.keymap[i].dom;
            if ([0, 2, 4, 5, 7, 9, 11].some(e => (i - e - 8) % 12 == 0)) {
                dom.className = "piano-key piano-white";
            }
            else {
                dom.className = "piano-key piano-black";
            }
            /* place characters on respective keys */
            var keyval = document.createElement("span");
            keyval.className = "piano-keyval";
            if (key.length == 1) {
                keyval.innerHTML = key;
            }
            else {
                keyval.innerHTML = {"Tab": "⇥", "Backspace": "⌫", "ShiftLeft": "⇧L", "ShiftRight": "⇧R", "Enter": "↵"}[key];
            }
            dom.appendChild(keyval);
            piano.keyboard.appendChild(dom);
        }
        /* place playback settings */
        piano.ui.appendChild(piano.menuright);
        piano.menuright.className = "piano-menu";
        piano.menuright.id = "piano-right";
        piano.playbackmode();
        /* link keyboard to audio */
        document.addEventListener("keydown", piano.keydown);
        document.addEventListener("keyup", piano.keyup);
    }
};
piano.init();
})();
