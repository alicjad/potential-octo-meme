< !DOCTYPE html >
  <html lang="en">
    <head>
      <title>KEANet</title>

      <script>
        function listboxresults(){
            var spanresult=document.getElementById("txtChosenCellPhones");
            spanresult.value="";
            var x=document.getElementById("txtCellPhones");
            for (var i=0; i<x.options.length;i++)
            {
                if(x.options[i].selected===true)
                {
          spanresult.value += x.options[i].value + " " ;
                    document.getElementById("txtChosenCellPhones").innerHTML=spanresult.value;
                    document.getElementById("txtChosenCellPhones").style.color="green";
                }
            }
            if(document.getElementById("txtChosenCellPhones").value=="")
            {
          document.getElementById("txtChosenCellPhones").innerHTML = "Please select some item";
                document.getElementById("txtChosenCellPhones").style.color="red";
            }
        }
    </script>
    </head>
    <body>
      <h1>KEANet</h1>
      <div>
        <input type="checkbox" id="chkInternetConnection">
          <label for="chkInternetConnection">Internet connection</label>
          <br>
            <label for="txtPhoneLines">Phone lines</label>
            <input type="number" min="0" max="8" step="1" ondrop="return false"; onpaste="return false"; 
             onkeypress='return event.charcode>=48 && event.charcode<=56' id="txtPhoneLines" value="0">
             <!--allows to select numebrs between 0-8-->
            <br>
              <label for="cmbCellPhones">Cell phones:</label>
              <br>
                <table>
                  <tr>
                    <hr>
                      <td>
                        <select id="txtCellPhones" size="5" multiple="multiple">
                          <option value="Motorola G99">Motorola G99</option>
                          <option value="iPhone 99">iPhone 99</option>
                          <option value="Samsung Galaxy 99">Samsung Galaxy 99</option>
                          <option value="Sony Xperia 99">Sony Xperia 99</option>
                          <option value="Huawei 99">Huawei 99</option>
                        </select>
                      </td>

                      <td>
                        <span id="txtChosenCellPhones"></span>
                      </td>
                    </hr>
                  </tr>
                </table>
                <br>
                  Total price: 0 DKK
            <br>
                  </br>
                  <input type="submit" id="but1" value="Buy" onclick="listboxresults();" />
</div>
</body>
</html>