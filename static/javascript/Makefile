.PHONY: core.js clean basicAnimationTest.html

core.js: libraries/linkedList.js libraries/entityManager.js
	cat libraries/linkedList.js libraries/entityManager.js > core.js

basicAnimationTest.html: core.js basicAnimationTest.js
	cat core.js basicAnimationTest.js > basicAnimationTestScript.js
	echo "<body></body>" > basicAnimationTest.html
	echo "<script src=\"basicAnimationTestScript.js\"></script>" >> basicAnimationTest.html

clean:
	rm basicAnimationTestScript.js basicAnimationTest.html

