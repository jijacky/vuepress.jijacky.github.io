### 代码格式审核

> 使用phpcs.phar

```
@echo OFF
:: in case DelayedExpansion is on and a path contains ! 
setlocal DISABLEDELAYEDEXPANSION
php "%~dp0phpcs.phar" %*

```

下载phpcs.phar，新建bat文件，放置于同一目录，将以上代码写入保存。然后再命令行直接调用即可

### 代码格式修正

> 使用phpcbf.phar

```
@echo OFF
:: in case DelayedExpansion is on and a path contains ! 
setlocal DISABLEDELAYEDEXPANSION
php "%~dp0phpcbf.phar" %*

```

下载phpcbf.phar，新建bat文件，放置于同一目录，将以上代码写入保存。然后再命令行直接调用即可

### GIT HOOK

> git 提交预检查钩子
> 将以下代码放入git hook目录的pre-commit文件即可


- 代码1
```
#!/bin/bash
#
# check PHP code syntax error and standard with phpcs
# author : star[github.com/star1989]
# date : 2017-02-24
PROJECT=$(git rev-parse --show-toplevel)
cd $PROJECT
SFILES=$(git diff --cached --name-only --diff-filter=ACMR HEAD | grep \\.php)
TMP_DIR=$PROJECT"/.tmp"

# Determine if a file list is passed
if [ "$#" -ne 0 ]
then
    exit 0
fi
echo "Checking PHP Lint..."
for FILE in $SFILES
do
#    echo "php -l -d display_errors=0 ${FILE}"
#   echo "git show :$FILE > $TMP_DIR/$FILE"
    php -l -d display_errors=0 $FILE
    if [ $? != 0  ]
    then
        echo "Fix the error before commit."
        exit 1
    fi
    FILES="$FILES $PROJECT/$FILE"
done

if [ "$FILES" != "" ]
then
    echo "Running Code Sniffer..."

    #TMP_DIR=/tmp/$(uuidgen)
    mkdir -p $TMP_DIR
    for FILE in $SFILES
    do
        mkdir -p $TMP_DIR/$(dirname $FILE)
        git show :$FILE > $TMP_DIR/$FILE
    done
    PHP D:/phpcs/phpcs.phar --standard=PSR2 --encoding=utf-8 -n $TMP_DIR
    PHPCS_ERROR=$?
    rm -rf $TMP_DIR
    if [ $PHPCS_ERROR != 0 ]
    then
        echo "Fix the error before commit."
        exit 1
    fi
fi

exit $?
```

- 代码2
```
#!/bin/bash
# PHP CodeSniffer pre-commit hook for git
#
# @author Soenke Ruempler <soenke@ruempler.eu>
# @author Sebastian Kaspari <s.kaspari@googlemail.com>
#
# see the README

#PHPCS_BIN=/usr/local/bin/phpcs
PHPCS_BIN="PHP D:/phpcs/phpcs.phar"
#PHPCS_CODING_STANDARD=PEAR
PHPCS_CODING_STANDARD=PSR12
PHPCS_IGNORE=
PHPCS_IGNORE_WARNINGS=1
TMP_STAGING=".tmp_staging"

# parse config
CONFIG_FILE=$(dirname $0)/config
if [ -e $CONFIG_FILE ]; then
    . $CONFIG_FILE
fi

# simple check if code sniffer is set up correctly
if [ ! -x $PHPCS_BIN ]; then
    echo "PHP CodeSniffer bin not found or executable -> $PHPCS_BIN"
    exit 1
fi

# stolen from template file
if git rev-parse --verify HEAD
then
    against=HEAD
else
    # Initial commit: diff against an empty tree object
    against=4b825dc642cb6eb9a060e54bf8d69288fbee4904
fi

# this is the magic: 
# retrieve all files in staging area that are added, modified or renamed
# but no deletions etc
FILES=$(git diff-index --name-only --cached --diff-filter=ACMR $against -- )

if [ "$FILES" == "" ]; then
    exit 0
fi

# create temporary copy of staging area
if [ -e $TMP_STAGING ]; then
    rm -rf $TMP_STAGING
fi
mkdir $TMP_STAGING

# match files against whitelist
FILES_TO_CHECK=""
for FILE in $FILES
do
    echo "$FILE" | egrep -q "$PHPCS_FILE_PATTERN"
    RETVAL=$?
    if [ "$RETVAL" -eq "0" ]
    then
        FILES_TO_CHECK="$FILES_TO_CHECK $FILE"
    fi
done

if [ "$FILES_TO_CHECK" == "" ]; then
    exit 0
fi

# execute the code sniffer
if [ "$PHPCS_IGNORE" != "" ]; then
    IGNORE="--ignore=$PHPCS_IGNORE"
else
    IGNORE=""
fi

if [ "$PHPCS_SNIFFS" != "" ]; then
    SNIFFS="--sniffs=$PHPCS_SNIFFS"
else
    SNIFFS=""
fi

if [ "$PHPCS_ENCODING" != "" ]; then
    ENCODING="--encoding=$PHPCS_ENCODING"
else
    ENCODING=""
fi

if [ "$PHPCS_IGNORE_WARNINGS" == "1" ]; then
    IGNORE_WARNINGS="-n"
else
    IGNORE_WARNINGS=""
fi

# Copy contents of staged version of files to temporary staging area
# because we only want the staged version that will be commited and not
# the version in the working directory
STAGED_FILES=""
for FILE in $FILES_TO_CHECK
do
  ID=$(git diff-index --cached $against $FILE | cut -d " " -f4)

  # create staged version of file in temporary staging area with the same
  # path as the original file so that the phpcs ignore filters can be applied
  mkdir -p "$TMP_STAGING/$(dirname $FILE)"
  git cat-file blob $ID > "$TMP_STAGING/$FILE"
  STAGED_FILES="$STAGED_FILES $TMP_STAGING/$FILE"
done

OUTPUT=$($PHPCS_BIN -s $IGNORE_WARNINGS --standard=$PHPCS_CODING_STANDARD $ENCODING $IGNORE $SNIFFS $STAGED_FILES)
RETVAL=$?

# delete temporary copy of staging area
rm -rf $TMP_STAGING

if [ $RETVAL -ne 0 ]; then
    echo "$OUTPUT" | less
fi

exit $RETVAL
```



