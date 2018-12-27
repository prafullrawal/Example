// SPDX-License-Identifier: Apache-2.0

/*
  Sample Chaincode based on Demonstrated Scenario

 This code is based on code written by the Hyperledger Fabric community.
  Original code can be found here: https://github.com/hyperledger/fabric-samples/blob/release/chaincode/fabcar/fabcar.go
 */

package main

/* Imports  
* 4 utility libraries for handling bytes, reading and writing JSON, 
formatting, and string manipulation  
* 2 specific Hyperledger Fabric specific libraries for Smart Contracts  
*/ 
import (
	"bytes"
	"encoding/json"
	"fmt"
	"strconv"

	"github.com/hyperledger/fabric/core/chaincode/shim"
	sc "github.com/hyperledger/fabric/protos/peer"
)

// Define the Smart Contract structure
type SmartContract struct {
}

/* Define Tuna structure, with 4 properties.  
Structure tags are used by encoding/json library
*/
type Tuna struct {
	Vessel string `json:"vessel"`
	Status  string `json:"status"`
	Price string `json:"price"`
	Timestamp string `json:"timestamp"`
	Supplier  string `json:"Supplier"`
	Distributor string `json:"distributor"`
	DeviceId  string `json:"deviceid"`
	Location  string `json:"location"`
	ShipmentId string `json:"shipmentid"`
	ShipmentStatus string `json:"shipmentstatus"`
	ShipmentSentTimestamp string `json: "shipmentsenttimestamp"`
        ShipmentReceiveTimestamp string `json: "shipmentreceivetimestamp"`

}


/* 
* The Init method *
  called when the Smart Contract "tuna-chaincode" is instantiated by the network
 * Best practice is to have any Ledger initialization in separate function 
 -- see initLedger()
 */

func (s *SmartContract) Init(APIstub shim.ChaincodeStubInterface) sc.Response {
	return shim.Success(nil)
}

/*
 * The Invoke method *
 called when an application requests to run the Smart Contract "tuna-chaincode"
 The app also specifies the specific smart contract function to call with args
 */
func (s *SmartContract) Invoke(APIstub shim.ChaincodeStubInterface) sc.Response {

	// Retrieve the requested Smart Contract function and arguments
	function, args := APIstub.GetFunctionAndParameters()
	// Route to the appropriate handler function to interact with the ledger
	if function == "queryRecord" {
		return s.queryRecord(APIstub, args)
	} else if function == "initLedger" {
		return s.initLedger(APIstub)
	} else if function == "addRecord" {
		return s.addRecord(APIstub, args)
	} else if function == "queryAllRecord" {
		return s.queryAllRecord(APIstub)
	} else if function == "updateRecordStatus" {
		return s.updateRecordStatus(APIstub, args)
	}else if function == "updateShipmentSentStatus" {
		return s.updateShipmentSentStatus(APIstub, args)
	}else if function == "updateShipmentReceiveStatus" {
                return s.updateShipmentReceiveStatus(APIstub, args)
        }


	return shim.Error("Invalid Smart Contract function name.")
}

/*
 * The queryRecord method *
Used to view the records of one particular tuna
It takes one argument -- the key for the tuna in question
 */
func (s *SmartContract) queryRecord(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	tunaAsBytes, _ := APIstub.GetState(args[0])
	if tunaAsBytes == nil {
		return shim.Error("Could not locate tuna")
	}
	return shim.Success(tunaAsBytes)
}

/*
 * The initLedger method *
Will add test data (10 tuna catches)to our network
 */
func (s *SmartContract) initLedger(APIstub shim.ChaincodeStubInterface) sc.Response {
	tuna := []Tuna{
		Tuna{ Vessel: "923F",
		Status: "New",
		Price: "$2",
		Supplier:"Alice",
		Distributor:"",
		Timestamp: "2018-10-22 15:02:44",
		ShipmentId:"",
		ShipmentStatus:"",
		ShipmentSentTimestamp:"",
		ShipmentReceiveTimestamp:"",
		DeviceId: "Mydevice" ,
		Location:"51.9435, 8.2735"},
	}
	i := 0
	for i < len(tuna) {
		fmt.Println("i is ", i)
		tunaAsBytes, _ := json.Marshal(tuna[i])
		APIstub.PutState(strconv.Itoa(i+1), tunaAsBytes)
		fmt.Println("Added", tuna[i])
		i = i + 1
	}


	return shim.Success(nil)
}

/*
 * The addRecord method *
Fisherman like Sarah would use to record each of her tuna catches. 
This method takes in eight arguments (attributes to be saved in the ledger). 
 */
func (s *SmartContract) addRecord(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 9 {
		return shim.Error("Incorrect number of arguments. Expecting 9")
	}

	var tuna = Tuna{ Vessel: args[1], Status: args[2], Timestamp: args[3], DeviceId: args[4] ,Location :args[5],ShipmentId:"",ShipmentStatus:"",ShipmentSentTimestamp:"",ShipmentReceiveTimestamp:"",
			 Price: args[6],Supplier:args[7],Distributor:args[8]}

	tunaAsBytes, _ := json.Marshal(tuna)
	err := APIstub.PutState(args[0], tunaAsBytes)
	if err != nil {
		return shim.Error(fmt.Sprintf("Failed to record tuna catch: %s", args[0]))
	}

	return shim.Success(nil)
}

/*
 * The queryAllRecord method *
allows for assessing all the records added to the ledger(all tuna catches)
This method does not take any arguments. Returns JSON string containing results. 
 */
func (s *SmartContract) queryAllRecord(APIstub shim.ChaincodeStubInterface) sc.Response {

	startKey := "2"
	endKey := "999"

	resultsIterator, err := APIstub.GetStateByRange(startKey, endKey)
	if err != nil {
		return shim.Error(err.Error())
	}
	defer resultsIterator.Close()

	// buffer is a JSON array containing QueryResults
	var buffer bytes.Buffer
	buffer.WriteString("[")

	bArrayMemberAlreadyWritten := false
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}
		// Add comma before array members,suppress it for the first array member
		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		buffer.WriteString("{\"Key\":")
		buffer.WriteString("\"")
		buffer.WriteString(queryResponse.Key)
		buffer.WriteString("\"")

		buffer.WriteString(", \"Record\":")
		// Record is a JSON object, so we write as-is
		buffer.WriteString(string(queryResponse.Value))
		buffer.WriteString("}")
		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("]")

	fmt.Printf("- queryAllRecord:\n%s\n", buffer.String())

	return shim.Success(buffer.Bytes())
}

/*
 * The updateRecordStatus method *
The data in the world state can be updated with who has possession. 
This function takes in 2 arguments, tuna id and new holder name. 
 */
func (s *SmartContract) updateRecordStatus(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 2 {
		return shim.Error("Incorrect number of arguments. Expecting 2")
	}

	tunaAsBytes, _ := APIstub.GetState(args[0])
	if tunaAsBytes == nil {
		return shim.Error("Could not locate item")
	}
	tuna := Tuna{}

	json.Unmarshal(tunaAsBytes, &tuna)
	// Normally check that the specified argument is a valid holder of tuna
	// we are skipping this check for this example
	tuna.Status = args[1]

	tunaAsBytes, _ = json.Marshal(tuna)
	err := APIstub.PutState(args[0], tunaAsBytes)
	if err != nil {
		return shim.Error(fmt.Sprintf("Failed to change item status: %s", args[0]))
	}

	return shim.Success(nil)
}


/*
 * The updateParcelRecordStatus method *
The data in the world state can be updated with who has possession. 
This function takes in 2 arguments, tuna id and new holder name. 
 */
 func (s *SmartContract) updateShipmentSentStatus(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 4 {
		return shim.Error("Incorrect number of arguments. Expecting 4444")
	}


	tunaAsBytes, _ := APIstub.GetState(args[0])
        if tunaAsBytes == nil {
                return shim.Error("Could not locate item")
        }
        tuna := Tuna{}

        json.Unmarshal(tunaAsBytes, &tuna)
        // Normally check that the specified argument is a valid holder of tuna
        // we are skipping this check for this example
        tuna.ShipmentId = args[1]
        tuna.ShipmentStatus = args[2]
	tuna.ShipmentSentTimestamp = args[3]

        tunaAsBytes, _ = json.Marshal(tuna)
        err := APIstub.PutState(args[0], tunaAsBytes)
        if err != nil {
                return shim.Error(fmt.Sprintf("Failed to change item status: %s", args[0]))
        }


	return shim.Success(nil)
}

 func (s *SmartContract) updateShipmentReceiveStatus(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

        if len(args) != 4 {
                return shim.Error("Incorrect number of arguments. Expecting 4")
        }


        tunaAsBytes, _ := APIstub.GetState(args[0])
        if tunaAsBytes == nil {
                return shim.Error("Could not locate item")
        }
        tuna := Tuna{}


        json.Unmarshal(tunaAsBytes, &tuna)
        // Normally check that the specified argument is a valid holder of tuna
        // we are skipping this check for this example 

	if tuna.ShipmentId == args[1] {
		
		tuna.ShipmentStatus = args[2]
		tuna.ShipmentReceiveTimestamp = args[3]

	}

        tunaAsBytes, _ = json.Marshal(tuna)
        err := APIstub.PutState(args[0], tunaAsBytes)
        if err != nil {
                return shim.Error(fmt.Sprintf("Failed to change item status: %s", args[0]))
        }

        return shim.Success(nil)
}


/*
 * main function *
calls the Start function 
The main function starts the chaincode in the container during instantiation.
 */
func main() {

	// Create a new Smart Contract
	err := shim.Start(new(SmartContract))
	if err != nil {
		fmt.Printf("Error creating new Smart Contract: %s", err)
	}
}
