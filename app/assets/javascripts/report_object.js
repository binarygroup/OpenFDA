// var defaultProcessor = function($event, key, target, options) {
//   console.log($event.target)
//   switch(option.elType) {
//     case 'text':
//       target[key] = $event.target.value;
//       break;
//     case 'date':
//       target[key] = $event.target.value;
//       target[key] = '[' + from + '+TO+' + to + ']';
//       break
//   }

// }


var SEX_VALUES = ['Unknown', 'Male', 'Female'];
var REACTION_OUTCOMES = ['All', 'Recovered/resolved.', 'Recovering/resolving.', 'Not recovered/not resolved.', 'Recovered/resolved with sequelae.', 'Fatal.', 'Unknown.'];
var COUNTRIES = ["ae", "ar", "at", "au", "az", "ba", "bd", "be", "bg", "bo", "br", "ca", "ch", "ci", "cl", "cm", "cn", "co", "cr", "cy", "cz", "de", "dk", "do", "dz", "ec", "ee", "eg", "es", "fi", "fr", "gb", "ge", "gr", "gt", "hk", "hn", "hr", "hu", "id", "ie", "il", "in", "iq", "ir", "is", "it", "jm", "jo", "jp", "ke", "kp", "kr", "kw", "kz", "lb", "lk", "lt", "lu", "lv", "ma", "mt", "mw", "mx", "my", "ng", "nl", "no", "nz", "pa", "pe", "ph", "pk", "pl", "pr", "pt", "qa", "ro", "rs", "ru", "sa", "sd", "se", "sg", "si", "sk", "sv", "th", "tn", "tr", "tw", "ua", "ug", "us", "uy", "uz", "ve", "vn", "za", "zw"]
var QUALIFICATIONS = ['All', 'Physician', 'Pharmacist', 'Other Health Professional', 'Lawyer', 'Consumer or non-health professional']
var COUNTRIES_FULL = {"AF": "Afghanistan", "AX": "Åland Islands", "AL": "Albania", "DZ": "Algeria", "AS": "American Samoa", "AD": "AndorrA", "AO": "Angola", "AI": "Anguilla", "AQ": "Antarctica", "AG": "Antigua and Barbuda", "AR": "Argentina", "AM": "Armenia", "AW": "Aruba", "AU": "Australia", "AT": "Austria", "AZ": "Azerbaijan", "BS": "Bahamas", "BH": "Bahrain", "BD": "Bangladesh", "BB": "Barbados", "BY": "Belarus", "BE": "Belgium", "BZ": "Belize", "BJ": "Benin", "BM": "Bermuda", "BT": "Bhutan", "BO": "Bolivia", "BA": "Bosnia and Herzegovina", "BW": "Botswana", "BV": "Bouvet Island", "BR": "Brazil", "IO": "British Indian Ocean Territory", "BN": "Brunei Darussalam", "BG": "Bulgaria", "BF": "Burkina Faso", "BI": "Burundi", "KH": "Cambodia", "CM": "Cameroon", "CA": "Canada", "CV": "Cape Verde", "KY": "Cayman Islands", "CF": "Central African Republic", "TD": "Chad", "CL": "Chile", "CN": "China", "CX": "Christmas Island", "CC": "Cocos (Keeling) Islands", "CO": "Colombia", "KM": "Comoros", "CG": "Congo", "CD": "Congo, The Democratic Republic of the", "CK": "Cook Islands", "CR": "Costa Rica", "CI": "Cote D\"Ivoire", "HR": "Croatia", "CU": "Cuba", "CY": "Cyprus", "CZ": "Czech Republic", "DK": "Denmark", "DJ": "Djibouti", "DM": "Dominica", "DO": "Dominican Republic", "EC": "Ecuador", "EG": "Egypt", "SV": "El Salvador", "GQ": "Equatorial Guinea", "ER": "Eritrea", "EE": "Estonia", "ET": "Ethiopia", "FK": "Falkland Islands (Malvinas)", "FO": "Faroe Islands", "FJ": "Fiji", "FI": "Finland", "FR": "France", "GF": "French Guiana", "PF": "French Polynesia", "TF": "French Southern Territories", "GA": "Gabon", "GM": "Gambia", "GE": "Georgia", "DE": "Germany", "GH": "Ghana", "GI": "Gibraltar", "GR": "Greece", "GL": "Greenland", "GD": "Grenada", "GP": "Guadeloupe", "GU": "Guam", "GT": "Guatemala", "GG": "Guernsey", "GN": "Guinea", "GW": "Guinea-Bissau", "GY": "Guyana", "HT": "Haiti", "HM": "Heard Island and Mcdonald Islands", "VA": "Holy See (Vatican City State)", "HN": "Honduras", "HK": "Hong Kong", "HU": "Hungary", "IS": "Iceland", "IN": "India", "ID": "Indonesia", "IR": "Iran, Islamic Republic Of", "IQ": "Iraq", "IE": "Ireland", "IM": "Isle of Man", "IL": "Israel", "IT": "Italy", "JM": "Jamaica", "JP": "Japan", "JE": "Jersey", "JO": "Jordan", "KZ": "Kazakhstan", "KE": "Kenya", "KI": "Kiribati", "KP": "Korea, Democratic People\"S Republic of", "KR": "Korea, Republic of", "KW": "Kuwait", "KG": "Kyrgyzstan", "LA": "Lao People\"S Democratic Republic", "LV": "Latvia", "LB": "Lebanon", "LS": "Lesotho", "LR": "Liberia", "LY": "Libyan Arab Jamahiriya", "LI": "Liechtenstein", "LT": "Lithuania", "LU": "Luxembourg", "MO": "Macao", "MK": "Macedonia, The Former Yugoslav Republic of", "MG": "Madagascar", "MW": "Malawi", "MY": "Malaysia", "MV": "Maldives", "ML": "Mali", "MT": "Malta", "MH": "Marshall Islands", "MQ": "Martinique", "MR": "Mauritania", "MU": "Mauritius", "YT": "Mayotte", "MX": "Mexico", "FM": "Micronesia, Federated States of", "MD": "Moldova, Republic of", "MC": "Monaco", "MN": "Mongolia", "MS": "Montserrat", "MA": "Morocco", "MZ": "Mozambique", "MM": "Myanmar", "NA": "Namibia", "NR": "Nauru", "NP": "Nepal", "NL": "Netherlands", "AN": "Netherlands Antilles", "NC": "New Caledonia", "NZ": "New Zealand", "NI": "Nicaragua", "NE": "Niger", "NG": "Nigeria", "NU": "Niue", "NF": "Norfolk Island", "MP": "Northern Mariana Islands", "NO": "Norway", "OM": "Oman", "PK": "Pakistan", "PW": "Palau", "PS": "Palestinian Territory, Occupied", "PA": "Panama", "PG": "Papua New Guinea", "PY": "Paraguay", "PE": "Peru", "PH": "Philippines", "PN": "Pitcairn", "PL": "Poland", "PT": "Portugal", "PR": "Puerto Rico", "QA": "Qatar", "RE": "Reunion", "RO": "Romania", "RU": "Russian Federation", "RW": "RWANDA", "SH": "Saint Helena", "KN": "Saint Kitts and Nevis", "LC": "Saint Lucia", "PM": "Saint Pierre and Miquelon", "VC": "Saint Vincent and the Grenadines", "WS": "Samoa", "SM": "San Marino", "ST": "Sao Tome and Principe", "SA": "Saudi Arabia", "SN": "Senegal", "CS": "Serbia and Montenegro", "SC": "Seychelles", "SL": "Sierra Leone", "SG": "Singapore", "SK": "Slovakia", "SI": "Slovenia", "SB": "Solomon Islands", "SO": "Somalia", "ZA": "South Africa", "GS": "South Georgia and the South Sandwich Islands", "ES": "Spain", "LK": "Sri Lanka", "SD": "Sudan", "SR": "Suriname", "SJ": "Svalbard and Jan Mayen", "SZ": "Swaziland", "SE": "Sweden", "CH": "Switzerland", "SY": "Syrian Arab Republic", "TW": "Taiwan, Province of China", "TJ": "Tajikistan", "TZ": "Tanzania, United Republic of", "TH": "Thailand", "TL": "Timor-Leste", "TG": "Togo", "TK": "Tokelau", "TO": "Tonga", "TT": "Trinidad and Tobago", "TN": "Tunisia", "TR": "Turkey", "TM": "Turkmenistan", "TC": "Turks and Caicos Islands", "TV": "Tuvalu", "UG": "Uganda", "UA": "Ukraine", "AE": "United Arab Emirates", "GB": "United Kingdom", "US": "United States", "UM": "United States Minor Outlying Islands", "UY": "Uruguay", "UZ": "Uzbekistan", "VU": "Vanuatu", "VE": "Venezuela", "VN": "Viet Nam", "VG": "Virgin Islands, British", "VI": "Virgin Islands, U.S.", "WF": "Wallis and Futuna", "EH": "Western Sahara", "YE": "Yemen", "ZM": "Zambia", "ZW": "Zimbabwe"}

var DRUG_FREQUENCY = {801: 'Year', 802: 'Month', 803: 'Week', 804: 'Day', 805: 'Hour', 806: 'Minute', 807: 'Trimester', 810: 'Cyclical', 811: 'Trimester', 812: 'As Necessary', 813: 'Total'}
var DRUG_UNIT = {'001': 'kg kilogram(s)', '002': 'G gram(s)', '003': 'Mg milligram(s)', '004': 'μg microgram(s)'}

var fetchTermsPreprocessor = function(property, $scope) {

  return $scope.getCounts(property.full_field + '.exact', 1000)
    .then(function(unProcessData){
      sortedData = $scope.orderByFilter(unProcessData, 'term').map(function(item) {
        return item.term
      });
      property.value.store = property.value.store.concat(sortedData);
      return property.value.store;
    })
}

var defaultProcessor = function(inputValue) {
  // console.log($event.target)
  var key = this.full_field;
  // var target = $scope.searchOptions;
  var processedValue = null;
  switch(this.value.elType) {
    case 'text':
      processedValue = key + ':' + inputValue;
      break;
    case 'date':
      if (inputValue.startDate && inputValue.endDate) {
        processedValue = key + ':' + ('[' + moment(inputValue.startDate).format('YYYYMMDD') + '+TO+' + moment(inputValue.endDate).format('YYYYMMDD') + ']');
      }
      break;
    case 'range':
      if (this.value.max != inputValue.max || this.value.min != inputValue.min) {
        processedValue = key + ':' + ('[' + inputValue.min + '+TO+' + inputValue.max + ']');
      }
      break;
    case 'select':


      // if(this.value.trackByIndex) {
      //   inputValue = this.value.store.indexOf(inputValue)
      // }

      processedValue = key + ':' + inputValue;
      break;
    case 'multi_select':
      if (inputValue && inputValue.length > 0) {
      //   if(this.value.trackByIndex) {
      //     var indexValues = []
      //     angular.forEach(inputValue, function(value, key){
      //       indexValues.push(this.value.store.indexOf(value))
      //     })
      //     inputValue = indexValues;
      //   }

        processedValue = '(' + key + ':' + inputValue.join('+') + ')'
      }
      break;
    default:
      throw 'Unknow elType';
  }

  return processedValue;

}

var safetyReportProperties = [];

function safetyPropertiesChild (node, parent) {

  angular.forEach(node, function(value, key){

    if(value.children) {
      safetyPropertiesChild(value.children, (parent ? parent + '.'  + key : key));
    } else {
      var newValue = angular.copy(value)
      newValue.children = null;
      safetyReportProperties.push({field: key, full_field: (parent ? parent + '.'  + key : key), value: newValue})
    }

  })
}

var safetyReportObject = {
  safetyreportversion: {
    visible: false,
    name: '',
    inTable: false,
    order: 50,
    elType: 'text',
    process: defaultProcessor,
  },
  safetyreportid: {
    visible: false,
    name: 'Report Id',
    inTable: true,
    order: 50,
    elType: 'text',
    process: defaultProcessor,
  },
  primarysourcecountry: {
    visible: false,
    name: '',
    inTable: false,
    order: 50,
    elType: 'text',
    process: defaultProcessor,
  },
  occurcountry: {
    visible: true,
    name: 'Country',
    inTable: true,
    order: 3,
    elType: 'multi_select',
    process: defaultProcessor,
    store: COUNTRIES_FULL,
    // preprocess: fetchTermsPreprocessor,
    trackByIndex: true
  },
  transmissiondateformat: {
    visible: false,
    name: '',
    inTable: false,
    order: 50,
    elType: 'text',
    process: defaultProcessor,
  },
  transmissiondate: {
    visible: false,
    name: '',
    inTable: false,
    order: 50,
    elType: 'date',
    process: defaultProcessor,
  },
  reporttype: {
    visible: false,
    name: '',
    inTable: false,
    order: 50,
    elType: 'text',
    process: defaultProcessor,
  },
  serious: {
    visible: false,
    name: '',
    inTable: false,
    order: 50,
    elType: 'checkbox',
    process: defaultProcessor,
  },
  seriousnesshospitalization: {
    visible: false,
    name: '',
    inTable: false,
    order: 50,
    elType: 'text',
    process: defaultProcessor,
  },
  receivedateformat: {
    visible: false,
    name: '',
    inTable: false,
    order: 50,
    elType: 'text',
    process: defaultProcessor,
  },
  receivedate: {
    visible: true,
    name: 'Report Date',
    inTable: true,
    order: 2,
    elType: 'date',
    process: defaultProcessor,
  },
  receiptdateformat: {
    visible: false,
    name: '',
    inTable: false,
    order: 50,
    elType: 'text',
    process: defaultProcessor,
  },
  receiptdate: {
    visible: false,
    name: '',
    inTable: false,
    order: 50,
    elType: 'date',
    process: defaultProcessor,
  },
  fulfillexpeditecriteria: {
    visible: false,
    name: '',
    inTable: false,
    order: 50,
    elType: 'text',
    process: defaultProcessor,
  },
  companynumb: {
    visible: false,
    name: '',
    inTable: false,
    order: 50,
    elType: 'text',
    process: defaultProcessor,
  },
  duplicate: {
    visible: false,
    name: '',
    inTable: false,
    order: 50,
    elType: 'text',
    process: defaultProcessor,
  },



  reportduplicate: {

    visible: false,
    name: '',
    inTable: false,
    order: 50,
    elType: 'expandable',
    process: defaultProcessor,

    children: {
      duplicatesource: {
        visible: false,
        name: '',
        inTable: false,
        order: 50,
        elType: 'text',
        process: defaultProcessor,
      },
      duplicatenumb: {
        visible: false,
        name: '',
        inTable: false,
        order: 50,
        elType: 'text',
        process: defaultProcessor,
      }
    }
  },


  // primarysource: {
  //   reportercountry: "JP",
  //   qualification: "1"
  // },

  primarysource: {

    visible: false,
    name: '',
    inTable: false,
    order: 50,
    elType: 'expandable',
    process: defaultProcessor,

    children: {
      reportercountry: {
        visible: false,
        name: 'Reporter Country',
        inTable: true,
        order: 20,
        elType: 'multi_select',
        process: defaultProcessor,
        store: [],
        preprocess: fetchTermsPreprocessor

      },
      qualification: {
        visible: true,
        name: 'Reporter Occupation',
        inTable: true,
        order: 21,
        elType: 'multi_select',
        process: defaultProcessor,
        trackByIndex: true,
        store: QUALIFICATIONS
      }
    }
  },


  // sender: {
  //   sendertype: "2",
  //   senderorganization: "FDA-Public Use "
  // },

  sender: {

    visible: false,
    name: '',
    inTable: false,
    order: 50,
    elType: 'expandable',
    process: defaultProcessor,

    children: {
      sendertype: {
        visible: false,
        name: '',
        inTable: false,
        order: 50,
        elType: 'text',
        process: defaultProcessor,
      },
      senderorganization: {
        visible: false,
        name: '',
        inTable: false,
        order: 50,
        elType: 'text',
        process: defaultProcessor,
      }
    }
  },



  // receiver: {
  //   receivertype: "6",
  //   receiverorganization: "FDA"
  // },

  receiver: {

    visible: false,
    name: '',
    inTable: false,
    order: 50,
    elType: 'expandable',
    process: defaultProcessor,

    children: {
      receivertype: {
        visible: false,
        name: '',
        inTable: false,
        order: 50,
        elType: 'text',
        process: defaultProcessor,
      },
      receiverorganization: {
        visible: false,
        name: '',
        inTable: false,
        order: 50,
        elType: 'text',
        process: defaultProcessor,
      }
    }
  },



  // patient: {
  //   patientonsetage: "71.619",
  //   patientonsetageunit: "801",
  //   patientweight: "38",
  //   patientsex: "2",

  //   reaction: {
  //     reactionmeddraversionpt: "18.0",
  //     reactionmeddrapt: "Epilepsy",
  //     reactionoutcome: "1"
  //   },


  patient: {

    visible: false,
    name: '',
    inTable: false,
    order: 50,
    elType: 'expandable',
    process: defaultProcessor,
    children: {
      patientonsetage: {
        visible: true,
        name: 'Age',
        inTable: true,
        order: 12,
        elType: 'range',
        min: 0,
        max: 110,
        // modelMin: 0,
        // modelMax: 200,
        process: defaultProcessor,
      },
      patientonsetageunit: {
        visible: false,
        name: '',
        inTable: false,
        order: 50,
        elType: 'text',
        process: defaultProcessor,
      },
      patientweight: {
        visible: true,
        name: 'Weight(in Kg)',
        inTable: true,
        order: 13,
        elType: 'range',
        min: 5,
        max: 120,
        // modelMin: 5,
        // modelMax: 200,
        process: defaultProcessor,
      },
      patientsex: {
        visible: true,
        name: 'Gender',
        inTable: true,
        order: 14,
        elType: 'select',
        process: defaultProcessor,
        trackByIndex: true,
        store: SEX_VALUES
      },


      drug: {

        visible: false,
        name: '',
        inTable: false,
        order: 50,
        elType: 'expandable',
        process: defaultProcessor,
        children: {

          drugcharacterization: {
            visible: false,
            name: '',
            inTable: false,
            order: 50,
            elType: 'text',
            process: defaultProcessor,
          },
          medicinalproduct: {
            visible: true,
            name: 'Drug Name',
            inTable: false,
            order: 5,
            elType: 'multi_select',
            process: defaultProcessor,
            store: [],
            preprocess: fetchTermsPreprocessor
          },
          drugauthorizationnumb: {
            visible: false,
            name: '',
            inTable: false,
            order: 50,
            elType: 'text',
            process: defaultProcessor,
          },
          drugstructuredosagenumb: {
            visible: false,
            name: '',
            inTable: false,
            order: 50,
            elType: 'text',
            process: defaultProcessor,
          },
          drugstructuredosageunit: {
            visible: false,
            name: '',
            inTable: false,
            order: 50,
            elType: 'text',
            process: defaultProcessor,
          },
          drugseparatedosagenumb: {
            visible: false,
            name: '',
            inTable: false,
            order: 50,
            elType: 'text',
            process: defaultProcessor,
          },
          drugintervaldosageunitnumb: {
            visible: false,
            name: '',
            inTable: false,
            order: 50,
            elType: 'text',
            process: defaultProcessor,
          },
          drugintervaldosagedefinition: {
            visible: false,
            name: '',
            inTable: false,
            order: 50,
            elType: 'text',
            process: defaultProcessor,
          },
          drugadministrationroute: {
            visible: false,
            name: '',
            inTable: false,
            order: 50,
            elType: 'text',
            process: defaultProcessor,
          },
          drugindication: {
            visible: false,
            name: '',
            inTable: false,
            order: 50,
            elType: 'text',
            process: defaultProcessor,
          },
          drugstartdateformat: {
            visible: false,
            name: '',
            inTable: false,
            order: 50,
            elType: 'text',
            process: defaultProcessor,
          },
          drugstartdate: {
            visible: false,
            name: '',
            inTable: false,
            order: 50,
            elType: 'date',
            process: defaultProcessor,
          },
          drugenddateformat: {
            visible: false,
            name: '',
            inTable: false,
            order: 50,
            elType: 'text',
            process: defaultProcessor,
          },
          drugenddate: {
            visible: false,
            name: '',
            inTable: false,
            order: 50,
            elType: 'date',
            process: defaultProcessor,
          },

          drugbatchnumb: {
            visible: false,
            name: 'Lot Number',
            inTable: true,
            order: 50,
            elType: 'text',
            process: defaultProcessor,
          },

          drugcumulativedosagenumb: {
            visible: false,
            name: 'Cum Dose Chr',
            inTable: false,
            order: 30,
            elType: 'range',
            min: 0.5,
            max: 43885716,
            process: defaultProcessor,
          },

          drugcumulativedosageunit: {
            visible: false,
            name: 'Dose Unit',
            inTable: false,
            order: 32,
            elType: 'multi_select',
            store: DRUG_UNIT,
            trackByIndex: true,
            // preprocess: fetchTermsPreprocessor,
            // trackByIndex: false,
            process: defaultProcessor,
          },

          drugdosageform: {
            visible: false,
            name: 'Dose Form',
            inTable: false,
            order: 33,
            elType: 'multi_select',
            store: [],
            preprocess: fetchTermsPreprocessor,
            trackByIndex: false,
            process: defaultProcessor,
          },

          drugintervaldosagedefinition: {
            visible: false  ,
            name: 'Dose Frequency',
            inTable: false,
            order: 34,
            elType: 'multi_select',
            store: DRUG_FREQUENCY,
            // preprocess: fetchTermsPreprocessor,
            trackByIndex: true,
            process: defaultProcessor,
          },

          actiondrug: {
            visible: false,
            name: '',
            inTable: false,
            order: 50,
            elType: 'text',
            process: defaultProcessor,
          },


          activesubstance: {
            visible: false,
            name: '',
            inTable: false,
            order: 50,
            elType: 'text',
            process: defaultProcessor,

            children: {
              activesubstancename: {
                visible: false,
                name: '',
                inTable: false,
                order: 50,
                elType: 'text',
                process: defaultProcessor,
              }
            }
          },
        }
      },



      reaction: {
        visible: false,
        name: '',
        inTable: false,
        order: 50,
        elType: 'text',
        process: defaultProcessor,

        children: {
          reactionmeddraversionpt: {
            visible: false,
            name: '',
            inTable: false,
            order: 50,
            elType: 'text',
            process: defaultProcessor,
          },

          reactionmeddrapt: {
            visible: false,
            name: '',
            inTable: false,
            order: 50,
            elType: 'text',
            process: defaultProcessor,
          },
          reactionoutcome: {
            visible: true,
            name: 'Patient Outcome',
            inTable: true,
            order: 6,
            elType: 'select',
            process: defaultProcessor,
            store: REACTION_OUTCOMES,
            trackByIndex: true
          }
        }


      },

    },


  // drug: {
  //   drugcharacterization: "1",
  //   medicinalproduct: "TOCILIZUMAB",
  //   drugauthorizationnumb: "125472",
  //   drugstructuredosagenumb: "162",
  //   drugstructuredosageunit: "003",
  //   drugseparatedosagenumb: "1",
  //   drugintervaldosageunitnumb: "2",
  //   drugintervaldosagedefinition: "803",
  //   drugadministrationroute: "058",
  //   drugindication: "RHEUMATOID ARTHRITIS",
  //   drugstartdateformat: "102",
  //   drugstartdate: "20130730",
  //   drugenddateformat: "610",
  //   drugenddate: "201312",
  //   actiondrug: "1",

  //   activesubstance: { activesubstancename: "TOCILIZUMAB" }
  // },


  },

  // summary: {
  //   narrativeincludeclinical: "CASE EVENT DATE: 20131216"
  // }


  summary: {

    visible: false,
    name: '',
    inTable: false,
    order: 50,
    elType: 'expandable',
    process: defaultProcessor,

    children: {
      narrativeincludeclinical: {
        visible: false,
        name: '',
        inTable: false,
        order: 50,
        elType: 'text',
        process: defaultProcessor,
      }
    }
  }

}


safetyPropertiesChild(safetyReportObject, null);
