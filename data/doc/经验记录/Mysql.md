### MySQL 分页

MySQL 分页的时候，使用
explain select * from ahshop_user limit 1000000,10;
会导致全表扫描，所以可以先借助索引字段查找记录的id。
然后根据id 执行IN操作
explain select id from ahshop_user limit 1000000,10;
explain select * from ahshop_user limit 1000000,10;
explain SELECT * FROM ahshop_user WHERE id>=(SELECT id FROM ahshop_user LIMIT 1000000,1) LIMIT 10;



### MySql 相似度计算

```SQL
CREATE FUNCTION levenshtein( s1 VARCHAR(255), s2 VARCHAR(255) )
RETURNS INT
DETERMINISTIC
BEGIN
DECLARE s1_len, s2_len, i, j, c, c_temp, cost INT;
DECLARE s1_char CHAR;
-- max strlen=255
DECLARE cv0, cv1 VARBINARY(256);
SET s1_len = CHAR_LENGTH(s1), s2_len = CHAR_LENGTH(s2), cv1 = 0x00, j = 1, i = 1, c = 0;
IF s1 = s2 THEN
RETURN 0;
ELSEIF s1_len = 0 THEN
RETURN s2_len;
ELSEIF s2_len = 0 THEN
RETURN s1_len;
ELSE
WHILE j <= s2_len DO
SET cv1 = CONCAT(cv1, UNHEX(HEX(j))), j = j + 1;
END WHILE;
WHILE i <= s1_len DO
SET s1_char = SUBSTRING(s1, i, 1), c = i, cv0 = UNHEX(HEX(i)), j = 1;
WHILE j <= s2_len DO
SET c = c + 1;
IF s1_char = SUBSTRING(s2, j, 1) THEN 
SET cost = 0; ELSE SET cost = 1;
END IF;
SET c_temp = CONV(HEX(SUBSTRING(cv1, j, 1)), 16, 10) + cost;
IF c > c_temp THEN SET c = c_temp; END IF;
SET c_temp = CONV(HEX(SUBSTRING(cv1, j+1, 1)), 16, 10) + 1;
IF c > c_temp THEN 
SET c = c_temp; 
END IF;
SET cv0 = CONCAT(cv0, UNHEX(HEX(c))), j = j + 1;
END WHILE;
SET cv1 = cv0, i = i + 1;
END WHILE;
END IF;
RETURN c;
END;

CREATE FUNCTION levenshtein_ratio( s1 VARCHAR(255), s2 VARCHAR(255) )
RETURNS INT
DETERMINISTIC
BEGIN
DECLARE s1_len, s2_len, max_len INT;
SET s1_len = LENGTH(s1), s2_len = LENGTH(s2);
IF s1_len > s2_len THEN 
SET max_len = s1_len; 
ELSE 
SET max_len = s2_len; 
END IF;
RETURN ROUND((1 - LEVENSHTEIN(s1, s2) / max_len) * 100);
END;
```


### 提取字符串中所有数字

```sql
CREATE FUNCTION GetNum (Varstring varchar(50))
RETURNS varchar(30)
BEGIN
DECLARE v_length INT DEFAULT 0;
DECLARE v_Tmp varchar(50) default '';
set v_length=CHAR_LENGTH(Varstring);
WHILE v_length > 0 DO
IF (ASCII(mid(Varstring,v_length,1))>47 and ASCII(mid(Varstring,v_length,1))<58 ) THEN
set v_Tmp=concat(v_Tmp,mid(Varstring,v_length,1));
END IF;
SET v_length = v_length - 1;
END WHILE;
RETURN REVERSE(v_Tmp);
END;
```

