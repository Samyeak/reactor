import React, { useState, useEffect } from "react";
import Login from "./components/Login/Login";
import MainHeader from "./components/MainHeader/MainHeader";
import Button from "./components/UI/Button";
import StyledButton from "./components/UI/StyledButton";
import { User } from "./components/Users/User";
import AuthContext from "./store/auth-context";
import _ from "lodash";
import * as xlsx from "xlsx";

const App = () => {
  const [displayMode, setDisplayMode] = useState("Dashboard");

  const Dashboard = () => {
    return (
      <div className="m-4">
        <a
          href="#"
          className="block  p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 h-screen"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Utility Functions (Temporary)
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Utility functions to ease processes
          </p>

          <div className="my-4">
            <Card
              title="Age Summarize (Excel Upload)"
              description="upload excel in specified format and get summarized excel"
              onClick={() => setDisplayMode("AgeSummarize")}
            ></Card>
          </div>
          
          <div className="my-4">
            <Card
              title="Blood Sample Key Generation"
              description="BLood Sample Key Generation"
              onClick={() => setDisplayMode("BloodSample")}
            ></Card>
          </div>
        </a>
      </div>
    );
  };

  return (
    <>
      {displayMode === "Dashboard" && <Dashboard />}
      {displayMode === "AgeSummarize" && <ExcelDataConversion />}
      {displayMode === "BloodSample" && <BloodSample />}
    </>
  );
};

const BloodSample = ()=>{
  const clusterRange = 75;
  const householdRange = 15;
  const individualRange = 5;
  const sampleRange = 5;
  const round = 'R2';

  const idFormat = (cluster, house, individual, sample, round) => `${String(cluster).padStart(2, '0')}${String(house).padStart(2, '0')}${String(individual).padStart(2, '0')}-${round}-${sample}`;

  const generateCodes = ()=>{
    let finalData = [];
        for(let cluster = 1; cluster <= clusterRange; cluster++){
          // let clusterData = {"ok"};
          for(let household = 1; household<= householdRange; household++){
            for(let individual = 1;  individual<= individualRange; individual++){
              for(let sample = 1; sample<= sampleRange; sample++){
                finalData.push({id: idFormat(cluster, household, individual, sample, round)});
              }
            }
          }
          // finalData[`Cluster ${cluster}`] = clusterData;
        }

        downloadExcel(finalData);
  }



  return (
    <div className="m-4">
      <a
        href="#"
        className="block  p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 h-screen"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          test
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          test
        </p>

        <div className="my-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="large_size"
          >
            Large file input
          </label>
         <button onClick={()=>generateCodes()}>Generate Code</button>
        </div>
      </a>
    </div>
  )
}

const ExcelDataConversion = () => {
  let fileName = "";
  const readUploadFile = async (e) => {
    e.preventDefault();
    if (e.target.files) {
      const excelData = await readExcelFile(e);
      console.log(excelData);
      fileName = e.target.files[0].name;
      const inputData = excelData.filter((x) => x);
      const convertedData = convertData(inputData);
      const groupedData = groupData(convertedData);

      const sheets = _.groupBy(
        groupedData.filter((x) => x.AgeGroup),
        (x) => x.AgeGroup
      );
      const finalSheets = { All: groupedData, ...sheets };
      downloadExcelWithSheets(finalSheets, fileName);
    }
  };

  return (
    <div className="m-4">
      <a
        href="#"
        className="block  p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 h-screen"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Excel Data Conversion
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Upload your excel here
        </p>

        <div className="my-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="large_size"
          >
            Large file input
          </label>
          <input
            className="block text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="large_size"
            type="file"
            onChange={readUploadFile}
          />
        </div>
      </a>
    </div>
  );
};

const Card = ({ title, description, onClick }) => {
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {description}
      </p>
      <a
        href="#"
        onClick={onClick}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Continue
        <svg
          aria-hidden="true"
          className="w-4 h-4 ml-2 -mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </a>
    </div>
  );
};

const readExcelFile = (e) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = xlsx.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = xlsx.utils.sheet_to_json(worksheet);
      resolve(json);
    };
    reader.readAsArrayBuffer(e.target.files[0]);
  });
};

const downloadExcelWithSheets = (sheetData, fileName) => {
  const workbook = xlsx.utils.book_new();
  for (let key in sheetData) {
    const worksheet = xlsx.utils.json_to_sheet(sheetData[key]);
    xlsx.utils.book_append_sheet(workbook, worksheet, key);
  }
  //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
  //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
  xlsx.writeFile(workbook, `Result_${fileName}.xlsx`);
};
const downloadExcel = (data) => {
  const worksheet = xlsx.utils.json_to_sheet(data);
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
  //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
  xlsx.writeFile(workbook, "DataSheet.xlsx");
};

const Layout = ({ children }) => {
  return (
    <div className="grid grid-cols-12 gap-4, w-full, h-screen">
      <div
        id="navbar"
        className="col-span-12 h-[3.75rem] bg-green-600 px-4 flex items-center"
      ></div>
      {children}
    </div>
  );
};
const CardAnimatedBorderGradient = () => {
  return (
    <div className="relative h-48 w-48 overflow-hidden rounded-xl border border-slate-800 p-[1px] backdrop-blur-3xl">
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <div className="inline-flex h-full w-full items-center justify-center rounded-xl bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl" />
    </div>
  );
};

const convertData = (data) => {
  let area = "",
    district = "",
    sub = "",
    ward = "";
  let result = data.map((x) => {
    if (!x) return;
    if (x.Area) {
      area = x.Area;
    }
    if (x.District) {
      district = x.District;
    }
    if (x.Gaupalika) {
      sub = x.Gaupalika;
    }
    if (x.Wards) {
      ward = x.Wards;
    }
    x.Area = area;
    x.District = district;
    x.Gaupalika = sub;
    x.Wards = ward;
    return x;
  });
  return result;
};

const groupData = (data) => {
  data = data.filter((x) => x);
  let groupedData = _.groupBy(
    data,
    (x) => `${x.District}|${x.Gaupalika}|${x.Wards}`
  );
  let finalResult = [];
  for (let key in groupedData) {
    let sum = getSum(groupedData, key);
    sum.forEach((x) => finalResult.push(x));
    finalResult.push({});
  }
  return finalResult;
};

function getSum(groupedData, key) {
  let allAge = groupedData[key].find((x) => x.AgeGroup == "All Ages");
  if (!allAge) return [];
  let age1 = groupedData[key].find((x) => ["05-09 Yrs."].includes(x.AgeGroup));
  let age2 = groupedData[key].find((x) => ["10-14 Yrs."].includes(x.AgeGroup));
  let age3 = groupedData[key].find((x) => ["15-19 Yrs."].includes(x.AgeGroup));
  let age4 = groupedData[key].filter((x) =>
    ["20-24 Yrs.", "25-29 Yrs."].includes(x.AgeGroup)
  );
  let age4Count = _.sumBy(age4, (x) => x.Female);
  let age5 = groupedData[key].filter((x) =>
    ["30-34 Yrs.", "35-39 Yrs.", "40-44 Yrs.", "45-49 Yrs."].includes(
      x.AgeGroup
    )
  );
  let age5Count = _.sumBy(age5, (x) => x.Female);

  let age6 = groupedData[key].find((x) => ["50-54 Yrs."].includes(x.AgeGroup));
  let newData = [
    {
      Area: "",
      District: allAge.District,
      Gaupalika: allAge.Gaupalika,
      Wards: allAge.Wards,
      AgeGroup: "All Ages",
      Female: allAge.Female,
      Percentage: 100,
    },
    {
      Area: "",
      District: allAge.District,
      Gaupalika: allAge.Gaupalika,
      Wards: allAge.Wards,
      AgeGroup: "05-09 Yrs.",
      Female: age1.Female,
      Percentage: (age1.Female / allAge.Female) * 100,
    },
    {
      Area: "",
      District: allAge.District,
      Gaupalika: allAge.Gaupalika,
      Wards: allAge.Wards,
      AgeGroup: "10-14 Yrs.",
      Female: age2.Female,
      Percentage: (age2.Female / allAge.Female) * 100,
    },
    {
      Area: "",
      District: allAge.District,
      Gaupalika: allAge.Gaupalika,
      Wards: allAge.Wards,
      AgeGroup: "15-19 Yrs.",
      Female: age3.Female,
      Percentage: (age3.Female / allAge.Female) * 100,
    },
    {
      Area: "",
      District: allAge.District,
      Gaupalika: allAge.Gaupalika,
      Wards: allAge.Wards,
      AgeGroup: "20-29 Yrs.",
      Female: age4Count,
      Percentage: (age4Count / allAge.Female) * 100,
    },
    {
      Area: "",
      District: allAge.District,
      Gaupalika: allAge.Gaupalika,
      Wards: allAge.Wards,
      AgeGroup: "30-49 Yrs.",
      Female: age5Count,
      Percentage: (age5Count / allAge.Female) * 100,
    },
    {
      Area: "",
      District: allAge.District,
      Gaupalika: allAge.Gaupalika,
      Wards: allAge.Wards,
      AgeGroup: "50-54 Yrs.",
      Female: age6.Female,
      Percentage: (age6.Female / allAge.Female) * 100,
    },
  ];
  newData = newData.map((x) => {
    x.Percentage = x.Percentage.toFixed(2);
    return x;
  });

  return newData;
}

let excelData = [
  null,
  {
    "Area ": "KOSHI",
  },
  {
    District: "Taplejung",
  },
  {
    District: "Taplejung",
    Gaupalika: "Phaktanlung Gaunpalika",
  },
  {
    District: "Taplejung",
    Gaupalika: "Phaktanlung Gaunpalika",
    Wards: "All",
  },
  {
    District: "Taplejung",
    Gaupalika: "Phaktanlung Gaunpalika",
    AgeGroup: "All Ages",
    Total: 11791,
    Male: 6088,
    Female: 5703,
  },
  {
    District: "Taplejung",
    Gaupalika: "Phaktanlung Gaunpalika",
    AgeGroup: "00-04 Yrs.",
    Total: 1015,
    Male: 555,
    Female: 460,
  },
  {
    District: "Taplejung",
    Gaupalika: "Phaktanlung Gaunpalika",
    AgeGroup: "05-09 Yrs.",
    Total: 1260,
    Male: 638,
    Female: 622,
  },
  {
    District: "Taplejung",
    Gaupalika: "Phaktanlung Gaunpalika",
    AgeGroup: "10-14 Yrs.",
    Total: 1158,
    Male: 574,
    Female: 584,
  },
  {
    District: "Taplejung",
    Gaupalika: "Phaktanlung Gaunpalika",
    AgeGroup: "15-19 Yrs.",
    Total: 1305,
    Male: 640,
    Female: 665,
  },
  {
    District: "Taplejung",
    Gaupalika: "Mikwakhola Gaunpalika",
    AgeGroup: "85-89 Yrs.",
    Total: 6,
    Male: 5,
    Female: 1,
  },
  {
    District: "Taplejung",
    Gaupalika: "Mikwakhola Gaunpalika",
    AgeGroup: "90-94 Yrs.",
    Total: 2,
    Male: 1,
    Female: 1,
  },
  {
    District: "Taplejung",
    Gaupalika: "Mikwakhola Gaunpalika",
    AgeGroup: "95+ Yrs.",
    Total: 0,
    Male: 0,
    Female: 0,
  },
  {
    District: "Taplejung",
    Gaupalika: "Mikwakhola Gaunpalika",
    Wards: 5,
  },
  {
    District: "Taplejung",
    Gaupalika: "Mikwakhola Gaunpalika",
    AgeGroup: "All Ages",
    Total: 1111,
    Male: 549,
    Female: 562,
  },
  {
    District: "Taplejung",
    Gaupalika: "Mikwakhola Gaunpalika",
    AgeGroup: "00-04 Yrs.",
    Total: 115,
    Male: 61,
    Female: 54,
  },
  {
    District: "Taplejung",
    Gaupalika: "Mikwakhola Gaunpalika",
    AgeGroup: "05-09 Yrs.",
    Total: 109,
    Male: 54,
    Female: 55,
  },
  {
    District: "Taplejung",
    Gaupalika: "Mikwakhola Gaunpalika",
    AgeGroup: "10-14 Yrs.",
    Total: 145,
    Male: 74,
    Female: 71,
  },
  {
    District: "Taplejung",
    Gaupalika: "Mikwakhola Gaunpalika",
    AgeGroup: "15-19 Yrs.",
    Total: 123,
    Male: 60,
    Female: 63,
  },
  {
    District: "Taplejung",
    Gaupalika: "Mikwakhola Gaunpalika",
    AgeGroup: "20-24 Yrs.",
    Total: 120,
    Male: 44,
    Female: 76,
  },
  {
    District: "Taplejung",
    Gaupalika: "Mikwakhola Gaunpalika",
    AgeGroup: "25-29 Yrs.",
    Total: 86,
    Male: 44,
    Female: 42,
  },
  {
    District: "Taplejung",
    Gaupalika: "Mikwakhola Gaunpalika",
    AgeGroup: "30-34 Yrs.",
    Total: 79,
    Male: 37,
    Female: 42,
  },
  {
    District: "Taplejung",
    Gaupalika: "Mikwakhola Gaunpalika",
    AgeGroup: "35-39 Yrs.",
    Total: 53,
    Male: 28,
    Female: 25,
  },
  {
    District: "Taplejung",
    Gaupalika: "Mikwakhola Gaunpalika",
    AgeGroup: "40-44 Yrs.",
    Total: 35,
    Male: 18,
    Female: 17,
  },
  {
    District: "Taplejung",
    Gaupalika: "Mikwakhola Gaunpalika",
    AgeGroup: "45-49 Yrs.",
    Total: 49,
    Male: 26,
    Female: 23,
  },
  {
    District: "Taplejung",
    Gaupalika: "Mikwakhola Gaunpalika",
    AgeGroup: "50-54 Yrs.",
    Total: 48,
    Male: 22,
    Female: 26,
  },
  {
    District: "Taplejung",
    Gaupalika: "Mikwakhola Gaunpalika",
    AgeGroup: "55-59 Yrs.",
    Total: 41,
    Male: 22,
    Female: 19,
  },
  {
    District: "Taplejung",
    Gaupalika: "Mikwakhola Gaunpalika",
    AgeGroup: "60-64 Yrs.",
    Total: 30,
    Male: 16,
    Female: 14,
  },
  {
    District: "Taplejung",
    Gaupalika: "Mikwakhola Gaunpalika",
    AgeGroup: "65-69 Yrs.",
    Total: 33,
    Male: 14,
    Female: 19,
  },
  {
    District: "Taplejung",
    Gaupalika: "Mikwakhola Gaunpalika",
    AgeGroup: "70-74 Yrs.",
    Total: 27,
    Male: 18,
    Female: 9,
  },
  {
    District: "Taplejung",
    Gaupalika: "Mikwakhola Gaunpalika",
    AgeGroup: "75-79 Yrs.",
    Total: 11,
    Male: 6,
    Female: 5,
  },
  {
    District: "Taplejung",
    Gaupalika: "Mikwakhola Gaunpalika",
    AgeGroup: "80-84 Yrs.",
    Total: 3,
    Male: 2,
    Female: 1,
  },
  {
    District: "Taplejung",
    Gaupalika: "Mikwakhola Gaunpalika",
    AgeGroup: "85-89 Yrs.",
    Total: 3,
    Male: 3,
    Female: 0,
  },
  {
    District: "Taplejung",
    Gaupalika: "Mikwakhola Gaunpalika",
    AgeGroup: "90-94 Yrs.",
    Total: 0,
    Male: 0,
    Female: 0,
  },
  {
    District: "Taplejung",
    Gaupalika: "Mikwakhola Gaunpalika",
    AgeGroup: "95+ Yrs.",
    Total: 1,
    Male: 0,
    Female: 1,
  },
  {
    District: "Taplejung",
    Gaupalika: "Mikwakhola Gaunpalika",
  },
];

const App1 = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <>
      <AuthContext.Provider value={{ isLoggedIn: isLoggedIn }}>
        <MainHeader />
        <Login />
        <StyledButton>Button from Styled </StyledButton>
        <Button>Button from Module</Button>
        <User />
      </AuthContext.Provider>
    </>
  );
};

export default App;

// import { useState } from 'react';
// import Expenses from './components/Expenses/Expenses';
// import NewExpense from './components/NewExpenses/NewExpense';
// const defaultExpenses = [
//   {
//     id: 1,
//     title: "Toilet Paper",
//     amount: 94.12,
//     date: new Date(2020, 1, 13)
//   },
//   {
//     id: 2,
//     title: "Lunch",
//     amount: 1256.12,
//     date: new Date(2020, 1, 18)
//   },
//   {
//     id: 3,
//     title: "Pokhara Trip",
//     amount: 18000,
//     date: new Date(2020, 1, 22)
//   }
// ];

// function App() {
//   const [expenses, setExpenses] = useState(defaultExpenses);

//   const addExpenseHandler = expense => {
//     setExpenses(prev => {
//       return [expense, ...prev];
//     });
//     console.log("App.js New Expense Data", expense);
//   };
//   return (
//     <div>
//       <h2>Let's get started</h2>
//       <NewExpense onAddExpense={addExpenseHandler}/>
//       <Expenses items={expenses} />
//     </div>
//   );
// }

// export default App;
