echo -n "For correct work your application in heroku you need comment line config/ in .gitignore file! You comment?(Y/n) "
read item
case "$item" in
    y|Y) echo "Continue..."
        ;;
    n|N) echo "End..."
        exit 0
        ;;
    *) echo "default..."
        ;;
esac
git add .
git commit -am "Deploy in Heroku"
git push heroku master