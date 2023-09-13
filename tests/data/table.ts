import type { PDFTable } from "swissqrbill:shared/types.js";


export const backgroundColorOverrides: PDFTable = {
  align: "center",
  backgroundColor: "#ff0000",
  rows: [
    {
      backgroundColor: "#00ff00",
      columns: [
        {
          text: "row, #00ff00"
        }, {
          backgroundColor: "#0000ff",
          text: "col, #0000ff"
        }, {
          text: "row, #00ff00"
        }
      ],
      height: 50
    },
    {
      columns: [
        {
          text: "table, #ff0000"
        }, {
          backgroundColor: "#0000ff",
          text: "col, #0000ff"
        }, {
          text: "table, #ff0000"
        }
      ],
      height: 50
    }
  ],
  verticalAlign: "center"
};

export const textColorOverrides: PDFTable = {
  align: "center",
  border: 1,
  rows: [
    {
      columns: [
        {
          text: "row, #00ff00"
        }, {
          text: "col, #0000ff",
          textColor: "#0000ff"
        }, {
          text: "row, #00ff00"
        }
      ],
      height: 50,
      textColor: "#00ff00"
    },
    {
      columns: [
        {
          text: "table, #ff0000"
        }, {
          text: "col, #0000ff",
          textColor: "#0000ff"
        }, {
          text: "table, #ff0000"
        }
      ],
      height: 50
    }
  ],
  textColor: "#ff0000",
  verticalAlign: "center"
};


export const alignmentVariants: PDFTable = {
  align: "center",
  border: 1,
  rows: [
    {
      columns: [
        {
          align: "left",
          text: "top left",
          verticalAlign: "top"
        }, {
          align: "center",
          text: "top center",
          verticalAlign: "top"
        }, {
          align: "right",
          text: "top right",
          verticalAlign: "top"
        }
      ],
      height: 50
    },
    {
      columns: [
        {
          align: "left",
          text: "center left",
          verticalAlign: "center"
        }, {
          align: "center",
          text: "center center",
          verticalAlign: "center"
        }, {
          align: "right",
          text: "center right",
          verticalAlign: "center"
        }
      ],
      height: 50
    },
    {
      columns: [
        {
          align: "left",
          text: "bottom left",
          verticalAlign: "bottom"
        }, {
          align: "center",
          text: "bottom center",
          verticalAlign: "bottom"
        }, {
          align: "right",
          text: "bottom right",
          verticalAlign: "bottom"
        }
      ],
      height: 50
    }
  ]
};

export const alignmentOverrides: PDFTable = {
  align: "center",
  border: 1,
  rows: [
    {
      align: "left",
      columns: [
        {
          text: "row, h: left, v: top"
        }, {
          align: "right",
          text: "col, h: right, v: bottom",
          verticalAlign: "bottom"
        }, {
          text: "row, h: left, v: top"
        }
      ],
      height: 50,
      verticalAlign: "top"
    },
    {
      columns: [
        {
          text: "table, h: center, v: center"
        }, {
          align: "right",
          text: "col, h: right, v: bottom",
          verticalAlign: "bottom"
        }, {
          text: "table, h: center, v: center"
        }
      ],
      height: 50
    }
  ],
  verticalAlign: "center"
};

export const borderThickness: PDFTable = {
  align: "center",
  rows: [
    {
      columns: [
        {
          align: "center",
          border: 1,
          text: "1",
          verticalAlign: "center"
        },
        {
          align: "center",
          border: 2,
          text: "2",
          verticalAlign: "center"
        },
        {
          align: "center",
          border: 3,
          text: "3",
          verticalAlign: "center"
        },
        {
          align: "center",
          border: 4,
          text: "4",
          verticalAlign: "center"
        }
      ],
      height: 50
    },
    {
      columns: [
        {
          align: "center",
          border: [4, 1, 1, 4],
          text: "4, 1, 1, 4",
          verticalAlign: "center"
        },
        {
          align: "center",
          border: [1],
          text: "1",
          verticalAlign: "center"
        },
        {
          align: "center",
          border: 1,
          text: "1",
          verticalAlign: "center"
        },
        {
          align: "center",
          border: [1, 4, 4, 1],
          text: "1, 4, 4, 1",
          verticalAlign: "center"
        }
      ],
      height: 50
    }
  ],
  verticalAlign: "center"
};

export const borderOverrides: PDFTable = {
  align: "center",
  border: 1,
  rows: [
    {
      border: 2,
      columns: [
        {
          text: "row, 2"
        }, {
          border: 3,
          text: "col, 3"
        }, {
          text: "row, 2"
        }
      ],
      height: 50
    },
    {
      columns: [
        {
          text: "table, 1"
        }, {
          border: 3,
          text: "col, 3"
        }, {
          text: "table, 1"
        }
      ],
      height: 50
    }
  ],
  verticalAlign: "center"
};

export const borderColor: PDFTable = {
  align: "center",
  border: 1,
  borderColor: "#ff0000",
  rows: [
    {
      borderColor: "#00ff00",
      columns: [
        {
          text: "row, #00ff00"
        }, {
          borderColor: "#0000ff",
          text: "col, #0000ff"
        }, {
          text: "row, #00ff00"
        }
      ],
      height: 50
    },
    {
      columns: [
        {
          text: "table, #ff0000"
        }, {
          borderColor: "#0000ff",
          text: "col, #0000ff"
        }, {
          borderColor: ["#ffff00", "#00ffff", "#ff00ff", "#ff8800"],
          text: "col, #ffff00, #00ffff, #ff00ff, #ff8800"
        }
      ],
      height: 50
    }
  ],
  verticalAlign: "center"
};

export const paddingVariants: PDFTable = {
  border: 1,
  rows: [
    {
      columns: [
        {
          text: "top left"
        }, {
          align: "right",
          text: "top right"
        }, {
          text: "bottom left",
          verticalAlign: "bottom"
        }, {
          align: "right",
          text: "bottom right",
          verticalAlign: "bottom"
        }
      ],
      height: 50,
      padding: 10
    },
    {
      columns: [
        {
          padding: [10, 0, 0, 10],
          text: "top left"
        }, {
          align: "right",
          padding: [10, 10, 0, 0],
          text: "top right"
        }, {
          padding: [0, 0, 10, 10],
          text: "bottom left",
          verticalAlign: "bottom"
        }, {
          align: "right",
          padding: [0, 10, 10, 0],
          text: "bottom right",
          verticalAlign: "bottom"
        }
      ],
      height: 50
    }
  ]
};

export const paddingOverrides: PDFTable = {
  border: 1,
  padding: 10,
  rows: [
    {
      columns: [
        {
          text: "row, 20"
        }, {
          padding: 30,
          text: "col, 30"
        }, {
          text: "row, 20"
        }
      ],
      padding: 20
    },
    {
      columns: [
        {
          text: "table, 10"
        }, {
          padding: 30,
          text: "col, 30"
        }, {
          text: "table, 10"
        }
      ]
    }
  ]
};

export const fontSizeOverrides: PDFTable = {
  align: "center",
  border: 1,
  fontSize: 18,
  rows: [
    {
      columns: [
        {
          text: "row, 22"
        }, {
          fontSize: 26,
          text: "col, 26"
        }, {
          text: "row, 22"
        }
      ],
      fontSize: 22
    },
    {
      columns: [
        {
          text: "table, 18"
        }, {
          fontSize: 26,
          text: "col, 26"
        }, {
          text: "table, 18"
        }
      ]
    }
  ],
  verticalAlign: "center"
};

export const autoWidth: PDFTable = {
  align: "center",
  border: 1,
  rows: [
    {
      columns: [
        {
          text: "auto"
        },
        {
          text: "200",
          width: 200
        },
        {
          text: "200",
          width: 200
        }
      ],
      height: 50
    },
    {
      columns: [
        {
          text: "200",
          width: 200
        }, {
          text: "auto"
        }, {
          text: "200",
          width: 200
        }
      ],
      height: 50
    },
    {
      columns: [
        {
          text: "200",
          width: 200
        }, {
          text: "200",
          width: 200
        }, {
          text: "auto"
        }
      ],
      height: 50
    },
    {
      columns: [
        {
          text: "auto"
        }, {
          text: "auto"
        }, {
          text: "auto"
        }
      ],
      height: 50
    },
    {
      columns: [
        {
          text: "100",
          width: 100
        },
        {
          text: "100",
          width: 100
        },
        {
          text: "100",
          width: 100
        }
      ],
      height: 50
    },
    {
      columns: [
        {
          text: "200",
          width: 200
        },
        {
          text: "200",
          width: 200
        },
        {
          text: "200",
          width: 200
        }
      ],
      height: 50
    }
  ],
  verticalAlign: "center",
  width: 500
};

export const header: PDFTable = {
  align: "center",
  border: 1,
  rows: [
    {
      columns: [
        {
          text: "header"
        }
      ],
      header: true
    },
    {
      columns: [
        {
          text: "col"
        },
        {
          text: "col"
        }
      ],
      height: 180
    },
    {
      columns: [
        {
          text: "col"
        },
        {
          text: "col"
        }
      ],
      height: 180
    },
    {
      columns: [
        {
          text: "col"
        },
        {
          text: "col"
        }
      ],
      height: 180
    },
    {
      columns: [
        {
          text: "col"
        },
        {
          text: "col"
        }
      ],
      height: 180
    }
  ],
  verticalAlign: "center"
};
