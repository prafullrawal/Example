<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>

<script type="text/javascript">

	
	function addRow(tableID) {
		var table = document.getElementById(tableID);
		var rowCount = table.rows.length;
		var row = table.insertRow(rowCount); //to insert blank row

		//var cell1 = row.insertCell(0);   //to insert first column
		//var snoCol = document.createElement("input");
		//snoCol.type = "text";
		//snoCol.name="ticket.passengerDetail["+(rowCount-1)+"].sno";
		//snoCol.value=rowCount;
		//cell1.appendChild(snoCol);
		var cell9 = row.insertCell(0); //to insert 4th column
		var rowRemoveCol = document.createElement("a");
		var text = document.createTextNode("delete");
		rowRemoveCol.appendChild(text);
		rowRemoveCol.setAttribute("href", "javascript:removeRow('dt','"
				+ (rowCount - 1) + "')");
		rowRemoveCol.name = "reqlink[]";
		rowRemoveCol.style.fontSize = "10px";
		cell9.appendChild(rowRemoveCol);
		//cell9.appendChild(rowRemoveCol);
		//var dlCol = document.createElement("input");
		//dlCol.type = "checkbox";
		//dlCol.name="checkLists["+(rowCount-1)+"]";
		//cell9.appendChild(dlCol);

		var cell2 = row.insertCell(1); //to insert second column
		var nameCol = document.createElement("input");
		nameCol.type = "text";
		nameCol.name = "testCases[" + (rowCount - 1) + "].testCase";
		nameCol.style.fontSize = "10px";
		cell2.appendChild(nameCol);

		var cell3 = row.insertCell(2); // to insert 3rd column
		var descCol = document.createElement("textarea");
		//descCol.type = "textarea";
		descCol.name = "testCases[" + (rowCount - 1) + "].description";
		descCol.style.fontSize = "10px";
		cell3.appendChild(descCol);

		var cell4 = row.insertCell(3); //to insert 4th column
		var patternCol = document.createElement("input");
		patternCol.type = "text";
		patternCol.name = "testCases[" + (rowCount - 1) + "].pattern";
		//var optionSynch = document.createElement("Synch");
		//var optionAsynch = document.createElement("Asynch");
		//patternCol.addChild(optionSynch);
		//patternCol.addChild(optionAsynch);
		//patternCol.type = "text";
		patternCol.style.fontSize = "10px";
		cell4.appendChild(patternCol);

		var cell5 = row.insertCell(4); //to insert 4th column
		var spCol = document.createElement("input");
		spCol.type = "text";
		spCol.name = "testCases[" + (rowCount - 1) + "].sourceProtocol";
		spCol.style.fontSize = "10px";
		cell5.appendChild(spCol);

		var cell6 = row.insertCell(5); //to insert 4th column
		var sfCol = document.createElement("input");
		sfCol.type = "text";
		sfCol.name = "testCases[" + (rowCount - 1) + "].sourceFormat";
		sfCol.style.fontSize = "10px";
		cell6.appendChild(sfCol);

		var cell7 = row.insertCell(6); //to insert 4th column
		var tpCol = document.createElement("input");
		tpCol.type = "text";
		tpCol.name = "testCases[" + (rowCount - 1) + "].targetProtocol";
		tpCol.style.fontSize = "10px";
		cell7.appendChild(tpCol);

		var cell8 = row.insertCell(7); //to insert 4th column
		var tfCol = document.createElement("input");
		tfCol.type = "text";
		tfCol.name = "testCases[" + (rowCount - 1) + "].targetFormat";
		tfCol.style.fontSize = "10px";
		cell8.appendChild(tfCol);

		return false;

	}

	function removeRow(tableID, rowNum) {

		//var table = document.getElementById(tableID);
		//alert(table)
		//table.deleteRow(parseInt(rowNum)+1);
		var deleteIndex = document.getElementById('df');

		deleteIndex.value = rowNum
		var form = document.getElementById('tf');

		form.action = "delete.action";
		form.submit();
		return false;
	}

	function addTestCase(tableID, rowNum) {

		//var table = document.getElementById(tableID);
		//alert(table)
		//table.deleteRow(parseInt(rowNum)+1);
		

		var form = document.getElementById('tf');
		
		form.action = "add.action";
		form.input();
		return false;
	}

	function goSubmit(deletedTestName) {

		document.testForm.action = "delete";
		document.testForm.submit();
		alert("submitted")

	}

	function deleteRec() {

		form = document.forms[0];
		form.action = "delete";
		form.submit();

	}

	function addProtocolProperties(type, testName, protocol) {

		//alert(type)
		//alert(testName)
		username = document.getElementById("un").value;
		//alert(username)
		if (protocol == null || protocol == "") {
			alert("Select protocol for " + type);
			return false;
		} else if (protocol == "HTTP" || protocol == "HTTPGET"
				|| protocol == "HTTPPOST") {
			alert("No extra configuraiton required for HTTP");
			return false;
		}
		var url = "loadProtocolProperties.action?type=" + type + "&testName="
				+ testName + "&username=" + username + "&protocol=" + protocol
				+ "&rand=" + Math.random();
		//alert(url)
		window
				.open(url, "_blank",
						"directories=no, status=no,width=600, height=500,top=100,left=250");

	}

	function addSecurityProperties(testName) {

		//alert(type)
		//alert(testName)
		username = document.getElementById("un").value;

		var url = "loadSecurityProperties.action?testName=" + testName
				+ "&username=" + username + "&rand=" + Math.random();
		//alert(url)
		window
				.open(url, "_blank",
						"directories=no, status=no,width=600, height=500,top=50,left=250");

	}

	function addHeaderProperties(testName) {

		//alert(type)
		//alert(testName)
		username = document.getElementById("un").value;

		var url = "loadHeaderProperties.action?testName=" + testName
				+ "&username=" + username + "&rand=" + Math.random();
		//alert(url)
		window
				.open(url, "_blank",
						"directories=no, status=no,width=600, height=500,top=50,left=250");

	}

	function uploadData(testName) {

		//alert(type)
		//alert(testName)
		username = document.getElementById("un").value;

		var url = "loadData.action?testName=" + testName + "&username="
				+ username + "&rand=" + Math.random();
		//alert(url)
		window
				.open(url, "_blank",
						"directories=no, status=no,width=600, height=600,top=50,left=250");

	}
	function executeTest() {

		username = document.getElementById("un").value;

		var url = "executeDisplay.action?username=" + username + "&rand="
				+ Math.random();
		//alert(url)
		window
				.open(url, "_blank",
						"directories=no, status=no,width=600, height=600,top=50,left=250");
	}
	function loadReports() {

		username = document.getElementById("un").value;

		var url = "loadReports.action?username=" + username + "&rand="
				+ Math.random();
		//alert(url)
		window
				.open(url, "_blank",
						"directories=no, status=no,width=600, height=600,top=50,left=250");
	}
	function currentReport() {

		//var table = document.getElementById(tableID);
		//alert(table)
		//table.deleteRow(parseInt(rowNum)+1);

		var form = document.getElementById('tf');

		form.action = "currentReport.action";
		form.submit();
		return false;
	}
	
	function SaveData(count){
	
		var serviceValidatorModel = document.getElementsByName("serviceValidatorModel")[0].value;
		
		for(var i=0; i<count; i++){
			
			serviceValidatorModel.testCases[i].testCase = document.getElementById('testCases[0].testCase').value;
			serviceValidatorModel.testCases[i].description = document.getElementById('testCases['+i+'].description').value;
			serviceValidatorModel.testCases[i].pattern = document.getElementById('testCases['+i+'].pattern').value;
			serviceValidatorModel.testCases[i].sourceProtocol = document.getElementById('testCases['+i+'].sourceProtocol').value;
			serviceValidatorModel.testCases[i].sourceFormat = document.getElementById('testCases['+i+'].sourceFormat').value;
			serviceValidatorModel.testCases[i].targetProtocol = document.getElementById('testCases['+i+'].targetProtocol').value;
			serviceValidatorModel.testCases[i].endpoint = document.getElementById('testCases['+i+'].endpoint').value;
			serviceValidatorModel.testCases[i].legacyEndPont = document.getElementById('testCases['+i+'].legacyEndPont').value;
			serviceValidatorModel.testCases[i].isActive = document.getElementById('testCases['+i+'].isActive').value;
			serviceValidatorModel.ignoreFields[i] = document.getElementById('ignoreFields['+i+']').value;
		}
		
		console.log(serviceValidatorModel);
		
		
		form.action = "save";
		form.submit();
		return false;
	}
	
</script>
<html>
<head>
<title>Welcome</title>
</head>
<body style="background-color: lightblue">
	<h2 align="center">Test Plan</h2>
	<p>${actionerror}</p>

	<form:form method="post" action="saved" form="testForm" id="tf">
		<input hidden id="df" name="deletedTestCaseName" value="${serviceValidatorModel.deletedTestCaseName}" />
		<input hidden id="un" name="username" value="${serviceValidatorModel.username}"/>
		<input hidden name="added" value="${serviceValidatorModel.added}"/>
		<s:set var="theme" value="'simple'" scope="page" />
		<!--  <table id="dt" width="350px" border="1" style="font-size:10px">-->
		<table id="dt" border="1" style="font-size: 10px">
			<TR>
				<TD>Action</TD>
				<TD>Test Case</TD>
				<TD>Description</TD>
				<TD>Pattern</TD>
				<TD>Source Protocol</TD>
				<TD>Source Format</TD>
				<TD>Target Protocol</TD>
				<TD>Target Format</TD>
				<TD>Ignore List</TD>
				<TD>URL</TD>
				<TD>Legacy URL</TD>
				<TD>Security</TD>
				<TD>Header</TD>
				<TD>data</TD>
				<TD>Active?</TD>
			</TR>
			
			<c:set var="count" value="0" scope="page" />
			<c:forEach  var="cnt" items="${serviceValidatorModel.testCases}">
				<TR style="font-size: 10px">
					<!-- <TD><s:checkbox name="checkLists[%{#cnt.count-1}]"/></TD> -->
					<td><a href="#" onclick="removeRow(dt,<c:out value='${count}'/>)" style="font-size: 10px">delete</a></td>
					<TD><input type="text" id="testCases[${count}].testCase" name="testCases[${count}].testCase" style="font-size:10px" readonly="true" value="${cnt.testCase}"/></TD>
					<TD><textarea type="text" id="testCases[${count}].description" name="testCases[${count}].description" style="font-size:10px" value="${cnt.description}">${cnt.description}</textarea></TD>
					<TD>
						<%-- <select list="patternList" name="testCases[%{#cnt.count-1}].pattern" style="font-size:10px" value="${cnt.pattern}"/> --%>
						<select style="font-size:10px"  name="testCases[${count}].pattern">
						 <c:forEach var="element" items="${serviceValidatorModel.patternList}">
						 	 <option value="${element}" ${element == cnt.pattern ? 'selected="selected" id="testCases[${count}].pattern" ' : ''}>${element}</option>
						 </c:forEach>
					</select> 
					
					</TD>
					<TD><table>
							<tr>
								<%-- <td><select list="${serviceValidatorModel.protocolList}" name="testCases[%{#cnt.count-1}].sourceProtocol" style="font-size:10px" selected="${cnt.sourceProtocol}"/></td> --%>
								<td>
									<select style="font-size:10px" name="testCases[${count}].sourceProtocol">
										 <c:forEach var="element" items="${serviceValidatorModel.protocolList}">
										 	 <option value="${element}" ${element == cnt.sourceProtocol ? 'selected="selected" id="testCases[${count}].sourceProtocol"' : ''}>${element}</option>
										 </c:forEach>
									</select>
								</td> 
								<td>
									<input type="button" value=".." style="font-size: 10px" onclick="addProtocolProperties('Source','<c:out value='${cnt.testCase}'/>','<c:out value='${cnt.sourceProtocol}'/>')" />
								</td>
							</tr>
						</table>
					</TD>
					<TD>
						<%-- <select list="formatList" name="testCases[%{#cnt.count-1}].sourceFormat" style="font-size:10px" value="${cnt.sourceFormat}"/> --%>
						<select style="font-size:10px" name="testCases[${count}].sourceFormat">
								 <c:forEach var="element" items="${serviceValidatorModel.formatList}">
								 	 <option value="${element}" ${element == cnt.sourceFormat ? 'selected="selected" id="testCases[${count}].sourceFormat"' : ''}>${element}</option>
								 </c:forEach>
						</select> 
					</TD>
					<TD>
						<table>
							<tr>
								<%-- <td><select list="protocolList" name="testCases[%{#cnt.count-1}].targetProtocol" style="font-size:10px" value="${cnt.targetProtocol}"/></td> --%>
								<td>
									<select style="font-size:10px" name="testCases[${count}].targetProtocol">
										 <c:forEach var="element" items="${serviceValidatorModel.protocolList}">
										 	 <option value="${element}" ${element == cnt.targetProtocol ? 'selected="selected" id="testCases[${count}].targetProtocol"' : ''}>${element}</option>
										 </c:forEach>
									</select>
								</td>
								<td>
									<input type="button" value=".." style="font-size: 10px" onclick="addProtocolProperties('Target','<c:out value='${cnt.testCase}'/>','<c:out value='${cnt.targetProtocol}' />')"/>
								</td>
							</tr>
						</table>
					</TD>
					<TD>
						<%-- <select list="formatList" name="testCases[%{#cnt.count-1}].targetFormat" style="font-size:10px" value="${cnt.targetFormat}"/> --%>
						<select style="font-size:10px" name="testCases[${count}].targetFormat">
								 <c:forEach var="element" items="${serviceValidatorModel.formatList}">
								 	 <option value="${element}" ${element == cnt.targetFormat ? 'selected="selected" id="testCases[${count}].targetFormat"' : ''}>${element}</option>
								 </c:forEach>
						</select> 
					</TD>
					<TD>
						<input type="text" id="ignoreFields[${count}]" name="ignoreFields[${count}]" style="font-size:10px" value="${cnt.ignoreList[0]}"/>
					</TD>
					<TD>
						<input type="text" id="testCases[${count}].endpoint" name="testCases[${count}].endpoint" style="font-size:10px" value="${cnt.endpoint}"/>
					</TD>
					<TD>
						<input type="text" id="testCases[${count}].legacyEndPont" name="testCases[${count}].legacyEndPont" style="font-size:10px" value="${cnt.legacyEndPont}"/>
					</TD>
					<td>
						<input type="button" value="sec.." style="font-size: 10px" onclick="addSecurityProperties('${cnt.testCase}')" />
					</td>
					<td><input type="button" value="header" style="font-size: 10px" onclick="addHeaderProperties('${cnt.testCase}')" /></td>
					<td><input type="button" value="data" style="font-size: 10px" onclick="uploadData('${cnt.testCase}')" /></td>
					<td>
						<!-- <select list="activeList" name="testCases[%{#cnt.count-1}].isActive" style="font-size:10px" /> -->
						<select style="font-size:10px" name="testCases[${count}].isActive">
								 <c:forEach var="element" items="${serviceValidatorModel.activeList}">
								 	 <option value="${element}" ${element == cnt.isActive ? 'selected="selected" id="testCases[${count}].isActive"' : ''}>${element}</option>
								 </c:forEach>
						</select>
					</td>
					
					<!-- <td><input type="button" value="Source" style="font-size:10px" onclick="addSourceProperties('Source','<s:property value="%{testCase}"/>')"/></td> -->
					<!--  <td><a href="javascript:goSubmit('<s:property value="testCases[%{#cnt.count-1}].testCase"/>')">delete</a></td>-->
					<!--  <td> <input type="button" value="delete data" onclick="removeRow('dt','<s:property value="%{#cnt.count-1}"/>')"/></td>-->
					<!--  <td><a href="#" onclick="removeRow('dt','<s:property value="%{#cnt.count-1}"/>')">delete</a></td>-->
			</TR>
			<c:set var="count" value="${count + 1}"  scope="page"/>
			
			</c:forEach >

		</table>


		<textarea hidden type="text" id="df" name="serviceValidatorModel" >${serviceValidatorModel}</textarea>	


		<table>
			<tr>
				<!--  <td align="right">
		 				<input type="button" value="Add data" onclick="addRow('dt')"/>
		 		</td>-->
				<td align="center">
					<input type="button"  onclick="SaveData(${count})" value="save" align="center" />
				</td>
				<td align="center">
					
					<c:choose>
					    <c:when test="${serviceValidatorModel.added}== false">
					       <input type="button" value="execute Tests" disabled="true" /> 
					    </c:when>    
					    <c:otherwise>
					        <input type="button" value="execute Tests" onclick="executeTest()" />
					    </c:otherwise>
					</c:choose>
					
				</td>
				<td align="center"><input type="button" value="All Reports" onclick="loadReports()" /></td>
				<td align="center"><input type="button" value="Current Report" onclick="currentReport()" /></td>
			</tr>
		</table>
		</br>
		</br>

		<table width="350px" border="1" style="font-size: 10px">
			<TR>
				<TD>Action</TD>
				<TD>Test Case</TD>
				<TD>Description</TD>
				<TD>Pattern</TD>
				<TD>Source Protocol</TD>
				<TD>Source Format</TD>
				<TD>Target Protocol</TD>
				<TD>Target Format</TD>
				<TD>Ignore List</TD>
				<TD>URL</TD>
				<TD>Legacy URL</TD>
				<!--  <TD>Source Info</TD>-->
			</TR>
			<TR style="font-size: 10px">
				<td>
					<input type="submit" value="Add" onclick="addTestCase()" />
				</td>
				<TD>
					<input  name="newTestCase.testCase" style="font-size: 10px" />
				</TD>
				<TD>
					<textarea value="" name="newTestCase.description" style="font-size: 10px"></textarea>
				</TD>
				<TD>
					<select style="font-size:10px" name="newTestCase.pattern">
						 <c:forEach var="element" items="${serviceValidatorModel.patternList}">
						 	 <option value="${element}">${element}</option>
						 </c:forEach>
					</select> 
				</TD>
				<TD>
					<select style="font-size:10px" name="newTestCase.sourceProtocol">
						 <c:forEach var="element" items="${serviceValidatorModel.protocolList}">
						 	 <option value="${element}">${element}</option>
						 </c:forEach>
					</select> 
				</TD>
				<TD>
					<select style="font-size:10px" name="newTestCase.sourceFormat">
						 <c:forEach var="element" items="${serviceValidatorModel.formatList}">
						 	 <option value="${element}">${element}</option>
						 </c:forEach>
					</select> 
				</TD>
				<TD>
					<select style="font-size:10px" name="newTestCase.targetProtocol">
						 <c:forEach var="element" items="${serviceValidatorModel.protocolList}">
						 	 <option value="${element}">${element}</option>
						 </c:forEach>
					</select> 
				</TD>
				<TD>
					<select style="font-size:10px" name="newTestCase.targetFormat">
						 <c:forEach var="element" items="${serviceValidatorModel.formatList}">
						 	 <option value="${element}">${element}</option>
						 </c:forEach>
				</TD>
				<TD>
					<input name="newTestCase.ignoreField" style="font-size:10px" />
				</TD>
				<TD>
					<input name="newTestCase.endpoint" style="font-size:10px" />
				</TD>
				<TD>
					<input name="newTestCase.legacyEndPont" style="font-size:10px" />
				</TD>

			</TR>
		</table>


	</form:form>

</body>
</html>
