export interface Employee {
  _id: string;
  Name: string;
  Mobile: number;
  Email: string;
  Gender: string;
  Username: string;
  Password: string;
  Joined_Data: string;
  Department: string;
}

export interface ResultData {
  data: Employee[];
  results: number;
}

export interface Result {
  result: ResultData;
  status: string;
}

//
//
export interface TestsSent {
  TestName: string;
  Duration: Number | any;
  Cost: Number | any;
}

export interface Tests {
  TestName: string;
  Duration: Number;
  Cost: Number;
  _id: string;
}
export interface TestsData {
  data: Tests[] | [];
  results: number;
}
export interface TestsDataResult {
  result: TestsData;
  status: string;
}

export interface AllRecords {
  _id: String;
  Name: String;
  Mobile: Number;
  Email: String;
  Gender: String;
  Registered_Date: String;
  Tests: null | Tests[];
  Amount: Number;
  Duration: Number;
  Report_Status: Boolean;
  Payment_Status: Boolean;
  Collection_Status: Boolean;
}
export interface AllRecordsData {
  data: AllRecords[] | [];
  results: number;
}

export interface AllRecordsResult {
  result: AllRecordsData;
  status: string;
  total: number;
}
//
//
export interface CreateRecord {
  Name: String;
  Mobile: Number;
  Email: String;
  Gender: String;
  Payment_Status: Boolean;
  Tests: Tests[] | [];
}

export interface createdRecordData {
  status: string;
  result: AllRecords;
}

export interface updateRecordData {
  Report_Status?: boolean;
  Payment_Status?: boolean;
  Collection_Status?: boolean;
}
export interface updatedRecord {
  status: string;
  result: {
    acknowledged: boolean;
    modifiedCount: number;
    upsertedId: null;
    upsertedCount: number;
    matchedCount: number;
  };
}
