< !DOCTYPE html >
  <html lang="en">
    <head>
      <title>KEANet</title>

      <script>
        function listboxresults(){
            var spanresult=document.getElementById("result");
            spanresult.value="";
            var x=document.getElementById("txtCellPhones");
            for (var i=0; i<x.options.length;i++)
            {
                if(x.options[i].selected===true)
                {
          spanresult.value += x.options[i].value + "";
                    document.getElementById("result").innerHTML=spanresult.value;
                    document.getElementById("result").style.color="green";
                }
            }
            if(document.getElementById("result").value=="")
            {
          document.getElementById("result").innerHTML = "please select some item";
                document.getElementById("result").style.color="red";
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
            <input type="number" id="txtPhoneLines" value="0">
              <p id="message"></p>
              <br>
                <label for="cmbCellPhones">Cell phones:</label>
                <br>
                  <table>
                    <tr>
                      <td>
                        <select id="txtCellPhones" size="5">
                          <option value="moto">Motorola G99</option>
                          <option value="iphone">iPhone 99</option>
                          <option value="samsung">Samsung Galaxy 99</option>
                          <option value="sony">Sony Xperia 99</option>
                          <option value="huawei">Huawei 99</option>
                        </select>
                      </td>

                      <td>
                        <span id="result"></span>
                      </td>
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