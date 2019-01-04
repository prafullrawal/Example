#!/bin/bash

set -e

echo Please enter the version of chaincode..

read version

echo upgrading chaindcode with $version.


docker exec -e "CORE_PEER_LOCALMSPID=Org1MSP" -e "CORE_PEER_ADDRESS=peer0.org1.cts.com:7051"  -e "CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.cts.com/users/Admin@org1.cts.com/msp" cli peer chaincode install -n mycc -v $version -p github.com/tuna-app

docker exec -e "CORE_PEER_LOCALMSPID=Org1MSP" -e "CORE_PEER_ADDRESS=peer0.org1.cts.com:7051"  -e "CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.cts.com/users/Admin@org1.cts.com/msp" cli peer chaincode upgrade -o orderer.cts.com:7050 -C firstchannel -n mycc -v $version -c '{"Args":[""]}' -P "OR ('Org1MSP.member','Org2MSP.member')"

sleep 10

docker exec -e "CORE_PEER_LOCALMSPID=Org1MSP" -e "CORE_PEER_ADDRESS=peer0.org1.cts.com:7051"  -e "CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.cts.com/users/Admin@org1.cts.com/msp" cli peer chaincode invoke -o orderer.cts.com:7050 -C firstchannel -n mycc -c '{"function":"initLedger","Args":[""]}'

docker exec -e "CORE_PEER_LOCALMSPID=Org2MSP" -e "CORE_PEER_ADDRESS=peer0.org2.cts.com:7051"  -e "CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.cts.com/users/Admin@org2.cts.com/msp" cli peer chaincode install -n mycc -v $version -p github.com/tuna-app

docker exec -e "CORE_PEER_LOCALMSPID=Org2MSP" -e "CORE_PEER_ADDRESS=peer0.org2.cts.com:7051"  -e "CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.cts.com/users/Admin@org2.cts.com/msp" cli peer chaincode invoke -o orderer.cts.com:7050 -C firstchannel -n mycc -c '{"function":"initLedger","Args":[""]}'

docker exec -e "CORE_PEER_LOCALMSPID=Org3MSP" -e "CORE_PEER_ADDRESS=peer0.org3.cts.com:7051"  -e "CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.cts.com/users/Admin@org3.cts.com/msp" cli peer chaincode install -n mycc -v $version -p github.com/tuna-app

docker exec -e "CORE_PEER_LOCALMSPID=Org3MSP" -e "CORE_PEER_ADDRESS=peer0.org3.cts.com:7051"  -e "CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.cts.com/users/Admin@org3.cts.com/msp" cli peer chaincode upgrade -o orderer.cts.com:7050 -C secondchannel -n mycc -v $version -c '{"Args":[""]}' -P "OR ('Org1MSP.member','Org3MSP.member')"

sleep 10

docker exec -e "CORE_PEER_LOCALMSPID=Org3MSP" -e "CORE_PEER_ADDRESS=peer0.org3.cts.com:7051"  -e "CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org3.cts.com/users/Admin@org3.cts.com/msp" cli peer chaincode invoke -o orderer.cts.com:7050 -C secondchannel -n mycc -c '{"function":"initLedger","Args":[""]}'

docker exec -e "CORE_PEER_LOCALMSPID=Org1MSP" -e "CORE_PEER_ADDRESS=peer0.org1.cts.com:7051"  -e "CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.cts.com/users/Admin@org1.cts.com/msp" cli peer chaincode invoke -o orderer.cts.com:7050 -C secondchannel -n mycc -c '{"function":"initLedger","Args":[""]}'


