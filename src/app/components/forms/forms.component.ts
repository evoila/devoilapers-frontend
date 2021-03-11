// app.component.ts

import { Component } from "@angular/core";

@Component({
  selector: "minimal-app",
  // Bind the "mySchema" member to the schema input of the Form component.
  template: '<sf-form [schema]="mySchema"></sf-form> <input type="checkbox">',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent {
  // The schema that will be used to generate a form
  mySchema = {
    "name": "My Visibility Binding Form DEMO",
    "type": "object",
    "description": "Some fields will only show if some condition do apply:",
    "properties": {
      "description1": {
        "type": "string",
        "title": "FIELD 1",
        "description": "Is only visible if car #1 exists with name 'fiat'",
        "properties": {},
        "fieldsets": [
          {
            "id": "fieldset-default",
            "title": "FIELD 1",
            "description": "Is only visible if car #1 exists with name 'fiat'",
            "name": "",
            "fields": []
          }
        ],
        "widget": {
          "id": "object"
        }
      },
      "description2": {
        "type": "object",
        "title": "FIELD 2",
        "description": "Is only visible if car #2 exists with name 'renault'",
        "properties": {},
        "fieldsets": [
          {
            "id": "fieldset-default",
            "title": "FIELD 2",
            "description": "Is only visible if car #2 exists with name 'renault'",
            "name": "",
            "fields": []
          }
        ],
        "widget": {
          "id": "object"
        }
      },
      "description3": {
        "type": "object",
        "title": "FIELD 3",
        "description": "Is only visible if car #2 exists and tire #3 is named 'michelin'",
        "properties": {},
        "fieldsets": [
          {
            "id": "fieldset-default",
            "title": "FIELD 3",
            "description": "Is only visible if car #2 exists and tire #3 is named 'michelin'",
            "name": "",
            "fields": []
          }
        ],
        "widget": {
          "id": "object"
        }
      },
      "description4": {
        "type": "object",
        "title": "FIELD 4",
        "description": "Is only visible if any car exists and tire #2 is named 'michelin'",
        "properties": {},
        "fieldsets": [
          {
            "id": "fieldset-default",
            "title": "FIELD 4",
            "description": "Is only visible if any car exists and tire #2 is named 'michelin'",
            "name": "",
            "fields": []
          }
        ],
        "widget": {
          "id": "object"
        }
      },
      "description5": {
        "type": "object",
        "title": "FIELD 5",
        "description": "Is only visible if any car has space for more than 3 passengers",
        "properties": {},
        "fieldsets": [
          {
            "id": "fieldset-default",
            "title": "FIELD 5",
            "description": "Is only visible if any car has space for more than 3 passengers",
            "name": "",
            "fields": []
          }
        ],
        "widget": {
          "id": "object"
        }
      },
      "spacer 1": {
        "type": "object",
        "title": " ",
        "description": " ",
        "properties": {},
        "fieldsets": [
          {
            "id": "fieldset-default",
            "title": " ",
            "description": " ",
            "name": "",
            "fields": []
          }
        ],
        "widget": {
          "id": "object"
        }
      },
      "fields": {
        "type": "object",
        "title": "Fields with visibility bindings",
        "properties": {
          "field1": {
            "type": "string",
            "title": "Field 1",
            "description": " This field is only visible if car #1 exists with name 'fiat'",
            "default": "You named the 1st car FIAT",
            "visibleIf": {
              "/garage/cars/0/name": [
                "fiat"
              ]
            },
            "widget": {
              "id": "string"
            }
          },
          "field2": {
            "type": "string",
            "title": "Field 2",
            "description": " This field is only visible if car #2 exists with name 'renault'",
            "default": "You named the 2nd car RENAULT",
            "visibleIf": {
              "/garage/cars/1/name": [
                "renault"
              ]
            },
            "widget": {
              "id": "string"
            }
          },
          "field3": {
            "type": "string",
            "title": "Field 3",
            "description": " This field is only visible if car #2 exists and tire #3 is named 'michelin'",
            "default": "You named the 3rd tire of the 2nd car MICHELIN",
            "visibleIf": {
              "/garage/cars/1/tires/2/name": [
                "michelin"
              ]
            },
            "widget": {
              "id": "string"
            }
          },
          "field4": {
            "type": "string",
            "title": "Field 4",
            "description": " This field is only visible if any car exists and tire #2 is named 'michelin'",
            "default": "You named the 2nd tire of any car/s MICHELIN",
            "visibleIf": {
              "/garage/cars/*/tires/1/name": [
                "michelin"
              ]
            },
            "widget": {
              "id": "string"
            }
          },
          "field5": {
            "type": "string",
            "title": "Field 5",
            "description": " This field is only visible if any car has space for more than 3 passengers",
            "default": "One car has space for more than 3 passengers",
            "visibleIf": {
              "/garage/cars/*/space": [
                "$EXP$ target.value > 3"
              ]
            },
            "widget": {
              "id": "string"
            }
          }
        },
        "fieldsets": [
          {
            "id": "fieldset-default",
            "title": "Fields with visibility bindings",
            "description": "",
            "name": "",
            "fields": [
              "field1",
              "field2",
              "field3",
              "field4",
              "field5"
            ]
          }
        ],
        "widget": {
          "id": "object"
        }
      },
      "spacer 2": {
        "type": "object",
        "title": " ",
        "description": " ",
        "properties": {},
        "fieldsets": [
          {
            "id": "fieldset-default",
            "title": " ",
            "description": " ",
            "name": "",
            "fields": []
          }
        ],
        "widget": {
          "id": "object"
        }
      },
      "garage": {
        "type": "object",
        "title": "Garage",
        "properties": {
          "name": {
            "type": "string",
            "title": "Garage name",
            "widget": {
              "id": "string"
            }
          },
          "cars": {
            "title": "Cars",
            "type": "array",
            "items": {
              "type": "object",
              "title": "Car",
              "properties": {
                "name": {
                  "widget": {
                    "id": "select"
                  },
                  "type": "string",
                  "title": "Car name",
                  "oneOf": [
                    {
                      "enum": [
                        ""
                      ],
                      "description": "Select car name"
                    },
                    {
                      "enum": [
                        "fiat"
                      ],
                      "description": "FIAT"
                    },
                    {
                      "enum": [
                        "renault"
                      ],
                      "description": "Renault"
                    }
                  ]
                },
                "space": {
                  "type": "number",
                  "title": "How many passengers",
                  "description": "How many passengers do fit in this car?",
                  "min": 3,
                  "max": 5,
                  "widget": {
                    "id": "number"
                  }
                },
                "tires": {
                  "title": "Tires",
                  "type": "array",
                  "maxItems": 4,
                  "items": {
                    "type": "object",
                    "properties": {
                      "name": {
                        "widget": {
                          "id": "select"
                        },
                        "type": "string",
                        "oneOf": [
                          {
                            "enum": [
                              ""
                            ],
                            "description": "Select tire name"
                          },
                          {
                            "enum": [
                              "michelin"
                            ],
                            "description": "Michelin"
                          },
                          {
                            "enum": [
                              "good year"
                            ],
                            "description": "Good Year"
                          }
                        ]
                      }
                    },
                    "fieldsets": [
                      {
                        "id": "fieldset-default",
                        "title": "",
                        "description": "",
                        "name": "",
                        "fields": [
                          "name"
                        ]
                      }
                    ],
                    "widget": {
                      "id": "object"
                    }
                  },
                  "widget": {
                    "id": "array"
                  }
                },
                "descriptionTires": {
                  "type": "object",
                  "description": "Press the above buttons 'Add' or 'Remove' to add or remove tires",
                  "properties": {},
                  "fieldsets": [
                    {
                      "id": "fieldset-default",
                      "title": "",
                      "description": "Press the above buttons 'Add' or 'Remove' to add or remove tires",
                      "name": "",
                      "fields": []
                    }
                  ],
                  "widget": {
                    "id": "object"
                  }
                }
              },
              "fieldsets": [
                {
                  "id": "fieldset-default",
                  "title": "Car",
                  "description": "",
                  "name": "",
                  "fields": [
                    "name",
                    "space",
                    "tires",
                    "descriptionTires"
                  ]
                }
              ],
              "widget": {
                "id": "object"
              }
            },
            "widget": {
              "id": "array"
            }
          },
          "descriptionCars": {
            "type": "object",
            "description": "Press the above buttons 'Add' or 'Remove' to add or remove cars",
            "properties": {},
            "fieldsets": [
              {
                "id": "fieldset-default",
                "title": "",
                "description": "Press the above buttons 'Add' or 'Remove' to add or remove cars",
                "name": "",
                "fields": []
              }
            ],
            "widget": {
              "id": "object"
            }
          }
        },
        "fieldsets": [
          {
            "id": "fieldset-default",
            "title": "Garage",
            "description": "",
            "name": "",
            "fields": [
              "name",
              "cars",
              "descriptionCars"
            ]
          }
        ],
        "widget": {
          "id": "object"
        }
      }
    },
    "fieldsets": [
      {
        "id": "fieldset-default",
        "title": "",
        "description": "Some fields will only show if some condition do apply:",
        "name": "My Visibility Binding Form DEMO",
        "fields": [
          "description1",
          "description2",
          "description3",
          "description4",
          "description5",
          "spacer 1",
          "fields",
          "spacer 2",
          "garage"
        ]
      }
    ],
    "widget": {
      "id": "object"
    }
  }
}
