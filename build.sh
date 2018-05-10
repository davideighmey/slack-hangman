
../node_modules/.bin/rimraf lib;
./node_modules/.bin/babel src --out-dir lib;
chmod +x lib/ticTacToe-run.js;
