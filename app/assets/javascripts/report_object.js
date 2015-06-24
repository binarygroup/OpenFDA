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
var REACTION_OUTCOMES = ['Not Defined', 'Recovered/resolved.', 'Recovering/resolving.', 'Not recovered/not resolved.', 'Recovered/resolved with sequelae.', 'Fatal.', 'Unknown.'];


var defaultProcessor = function($event, $scope, target) {
  console.log($event.target)
  var key = $scope.current_key;
  switch($scope.value.elType) {
    case 'text':
      target[key] = $event.target.value;
      break;
    case 'date':
      if ($scope.temp.to && $scope.temp.from) {
        target[key] = ('[' + moment($scope.temp.from).format('YYYYMMDD') + '+TO+' + moment($scope.temp.from).format('YYYYMMDD') + ']');
      }
      break
  }

}

var safetyReportObject = {
  safetyreportversion: {
    visible: true,
    inTable: true,
    order: 0,
    elType: 'text',
    process: defaultProcessor,
  },
  safetyreportid: {
    visible: true,
    inTable: true,
    order: 0,
    elType: 'text',
    process: defaultProcessor,
  },
  primarysourcecountry: {
    visible: true,
    inTable: true,
    order: 0,
    elType: 'text',
    process: defaultProcessor,
  },
  occurcountry: {
    visible: true,
    inTable: true,
    order: 0,
    elType: 'text',
    process: defaultProcessor,
  },
  transmissiondateformat: {
    visible: true,
    inTable: true,
    order: 0,
    elType: 'text',
    process: defaultProcessor,
  },
  transmissiondate: {
    visible: true,
    inTable: true,
    order: 0,
    elType: 'text',
    process: defaultProcessor,
  },
  reporttype: {
    visible: true,
    inTable: true,
    order: 0,
    elType: 'text',
    process: defaultProcessor,
  },
  serious: {
    visible: true,
    inTable: true,
    order: 0,
    elType: 'checkbox',
    process: defaultProcessor,
  },
  seriousnesshospitalization: {
    visible: true,
    inTable: true,
    order: 0,
    elType: 'text',
    process: defaultProcessor,
  },
  receivedateformat: {
    visible: true,
    inTable: true,
    order: 0,
    elType: 'text',
    process: defaultProcessor,
  },
  receivedate: {
    visible: true,
    inTable: true,
    order: 0,
    elType: 'date',
    process: defaultProcessor,
  },
  receiptdateformat: {
    visible: true,
    inTable: true,
    order: 0,
    elType: 'text',
    process: defaultProcessor,
  },
  receiptdate: {
    visible: true,
    inTable: true,
    order: 0,
    elType: 'text',
    process: defaultProcessor,
  },
  fulfillexpeditecriteria: {
    visible: true,
    inTable: true,
    order: 0,
    elType: 'text',
    process: defaultProcessor,
  },
  companynumb: {
    visible: true,
    inTable: true,
    order: 0,
    elType: 'text',
    process: defaultProcessor,
  },
  duplicate: {
    visible: true,
    inTable: true,
    order: 0,
    elType: 'text',
    process: defaultProcessor,
  },



  reportduplicate: {

    visible: true,
    inTable: true,
    order: 0,
    elType: 'expandable',
    process: defaultProcessor,

    children: {
      duplicatesource: {
        visible: true,
        inTable: true,
        order: 0,
        elType: 'text',
        process: defaultProcessor,
      },
      duplicatenumb: {
        visible: true,
        inTable: true,
        order: 0,
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

    visible: true,
    inTable: true,
    order: 0,
    elType: 'expandable',
    process: defaultProcessor,

    children: {
      reportercountry: {
        visible: true,
        inTable: true,
        order: 0,
        elType: 'text',
        process: defaultProcessor,
      },
      qualification: {
        visible: true,
        inTable: true,
        order: 0,
        elType: 'text',
        process: defaultProcessor,
      }
    }
  },


  // sender: {
  //   sendertype: "2",
  //   senderorganization: "FDA-Public Use "
  // },

  sender: {

    visible: true,
    inTable: true,
    order: 0,
    elType: 'expandable',
    process: defaultProcessor,

    children: {
      sendertype: {
        visible: true,
        inTable: true,
        order: 0,
        elType: 'text',
        process: defaultProcessor,
      },
      senderorganization: {
        visible: true,
        inTable: true,
        order: 0,
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

    visible: true,
    inTable: true,
    order: 0,
    elType: 'expandable',
    process: defaultProcessor,

    children: {
      receivertype: {
        visible: true,
        inTable: true,
        order: 0,
        elType: 'text',
        process: defaultProcessor,
      },
      receiverorganization: {
        visible: true,
        inTable: true,
        order: 0,
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

    visible: true,
    inTable: true,
    order: 0,
    elType: 'expandable',
    process: defaultProcessor,
    children: {
      patientonsetage: {
        visible: true,
        inTable: true,
        order: 0,
        elType: 'text',
        process: defaultProcessor,
      },
      patientonsetageunit: {
        visible: true,
        inTable: true,
        order: 0,
        elType: 'text',
        process: defaultProcessor,
      },
      patientweight: {
        visible: true,
        inTable: true,
        order: 0,
        elType: 'text',
        process: defaultProcessor,
      },
      patientsex: {
        visible: true,
        inTable: true,
        order: 0,
        elType: 'text',
        process: defaultProcessor,
      },


      reaction: {
        visible: true,
        inTable: true,
        order: 0,
        elType: 'text',
        process: defaultProcessor,

        children: {
          reactionmeddraversionpt: {
            visible: true,
            inTable: true,
            order: 0,
            elType: 'text',
            process: defaultProcessor,
          },

          reactionmeddrapt: {
            visible: true,
            inTable: true,
            order: 0,
            elType: 'text',
            process: defaultProcessor,
          },
          reactionoutcome: {
            visible: true,
            inTable: true,
            order: 0,
            elType: 'text',
            process: defaultProcessor,
          }
        }


      },

    }
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


  drug: {

    visible: true,
    inTable: true,
    order: 0,
    elType: 'expandable',
    process: defaultProcessor,
    children: {

      drugcharacterization: {
        visible: true,
        inTable: true,
        order: 0,
        elType: 'text',
        process: defaultProcessor,
      },
      medicinalproduct: {
        visible: true,
        inTable: true,
        order: 0,
        elType: 'text',
        process: defaultProcessor,
      },
      drugauthorizationnumb: {
        visible: true,
        inTable: true,
        order: 0,
        elType: 'text',
        process: defaultProcessor,
      },
      drugstructuredosagenumb: {
        visible: true,
        inTable: true,
        order: 0,
        elType: 'text',
        process: defaultProcessor,
      },
      drugstructuredosageunit: {
        visible: true,
        inTable: true,
        order: 0,
        elType: 'text',
        process: defaultProcessor,
      },
      drugseparatedosagenumb: {
        visible: true,
        inTable: true,
        order: 0,
        elType: 'text',
        process: defaultProcessor,
      },
      drugintervaldosageunitnumb: {
        visible: true,
        inTable: true,
        order: 0,
        elType: 'text',
        process: defaultProcessor,
      },
      drugintervaldosagedefinition: {
        visible: true,
        inTable: true,
        order: 0,
        elType: 'text',
        process: defaultProcessor,
      },
      drugadministrationroute: {
        visible: true,
        inTable: true,
        order: 0,
        elType: 'text',
        process: defaultProcessor,
      },
      drugindication: {
        visible: true,
        inTable: true,
        order: 0,
        elType: 'text',
        process: defaultProcessor,
      },
      drugstartdateformat: {
        visible: true,
        inTable: true,
        order: 0,
        elType: 'text',
        process: defaultProcessor,
      },
      drugstartdate: {
        visible: true,
        inTable: true,
        order: 0,
        elType: 'text',
        process: defaultProcessor,
      },
      drugenddateformat: {
        visible: true,
        inTable: true,
        order: 0,
        elType: 'text',
        process: defaultProcessor,
      },
      drugenddate: {
        visible: true,
        inTable: true,
        order: 0,
        elType: 'text',
        process: defaultProcessor,
      },



      actiondrug: {
        visible: true,
        inTable: true,
        order: 0,
        elType: 'text',
        process: defaultProcessor,
      },


      activesubstance: {
        visible: true,
        inTable: true,
        order: 0,
        elType: 'text',
        process: defaultProcessor,

        children: {
          activesubstancename: {
            visible: true,
            inTable: true,
            order: 0,
            elType: 'text',
            process: defaultProcessor,
          }
        }
      },
    }
  },


  // summary: {
  //   narrativeincludeclinical: "CASE EVENT DATE: 20131216"
  // }


  summary: {

    visible: true,
    inTable: true,
    order: 0,
    elType: 'expandable',
    process: defaultProcessor,

    children: {
      narrativeincludeclinical: {
        visible: true,
        inTable: true,
        order: 0,
        elType: 'text',
        process: defaultProcessor,
      }
    }
  }

}