import json

def get_json_data(file):
    with open(file, 'r', encoding='utf-8') as f:
        return json.load(f)

def get_dict_from_json(file = 'scores.json'):
    jason = get_json_data(file)
    return jason['scores']

def save_as_json(dic):
    with open('scores.json', 'w', 2) as jf:
        json.dump({'scores': dic}, jf, sort_keys=True)

def reset_json_file():
    save_as_json({})

def scores_to_dict(file):
    with open(file, 'r') as f:
        dic = {}
        end_file = f.seek(0, 2)
        f.seek(0)
        task_number = f.name.split('.')[0]
        max_score = int(f.readline().strip())
        while f.tell() < end_file:
            item = f.readline().strip()
            score = int(f.readline().strip().split()[0])

            if item in dic:
                if task_number in dic[item]:
                    dic[item][task_number] = [score, max_score]
                else:
                    dic[item] = {task_number: [score, max_score]}
            else:
                dic[item] = {task_number: [score, max_score]}
    return dic

def dict_union(dic1, dic2):
    for k in dic2.keys():
        if k in dic1:
            for kk in dic2[k].keys():
                dic1[k].setdefault(kk, dic2[k][kk])
        else:
            dic1[k] = dic2[k]
    return dic1

def add_scores(file):
    json_dict = get_dict_from_json('scores.json')
    scores_dict = scores_to_dict(file)
    dic = dict_union(json_dict, scores_dict)
    save_as_json(dic)

def set_json_file(files):
    reset_json_file()
    for file in files:
        add_scores(file)

def get_sum_max_scores(files):
    max_score = 0
    for file in files:
        with open(file, 'r', encoding='utf-8') as f:
            max_score += int(f.readline().strip())
    return max_score

def get_course_scores(files):
    set_json_file(files)
    dic = get_dict_from_json()
    max_score = get_sum_max_scores(files)
    res = {}
    for k in dic.keys():
        scores = 0
        for kk in dic[k].keys():
            scores += dic[k][kk][0]
        res[k] = round(scores / max_score * 100, 1)
    return res

course1 = ['1.txt', '2.txt', '4.txt', '5.txt']

res = get_course_scores(course1)
print(res)