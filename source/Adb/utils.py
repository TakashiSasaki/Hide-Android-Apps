def diffLists(list1, list2):
    list1 = set(list1)
    list2 = set(list2)
    list1only = set()
    list2only = set()
    both = set()
    for l1 in list1:
        if l1 in list2:
            both.add(l1)
        else:
            list1only.add(l1)
    for l2 in list2:
        if l2 in list1:
            both.add(l2)
        else:
            list2only.add(l2)
    return (list1only, both, list2only)
