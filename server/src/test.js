const { exec } = require("child_process");

exec("df -H / | awk 'FNR == 2 {print $3}'", (err, stdout) => {
  console.log(stdout);
});

exec("df -H / | awk 'FNR == 2 {print $4}'", (err, stdout) => {
  console.log(stdout);
});
