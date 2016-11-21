import re


class A:
    __slots__ = ["m1", "m2"]

    regexGet = re.compile("^get")
    regexPost = re.compile("^post")

    def f1(self):
        print("f1")

    def f2(self):
        print("f2")

    def getA(self):
        print("getA")

    def postA(self):
        print("postA")

    def test(self):
        for x in self.__dir__():
            try:
                if hasattr(self.__getattribute__(x), "__func__"):
                    m = self.regexGet.match(x)
                    print(x, m, self.__getattribute__(x))
            except AttributeError:
                pass


if __name__ == "__main__":
    a = A()
    a.test()
