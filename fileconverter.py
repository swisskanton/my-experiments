"""
File converter
PNG <--> JPG
CSV <--> JSON
TXT <--> CSV, JSON
"""
import json


def select_files_type():
    file_types = {
        'from' : '1. PNG, \n2. JPG, \n3. CSV, \n4. JSON, \n5. TXT',
        'csv': ['JSON', 'TXT'],
        'json': ['CSV', 'TXT'],
        'txt': ['CSV', 'JSON'],
    }
    source = input(f'Please select the type of file you want to convert.\n{file_types["from"]}\n')
    target_type = ''
    while True:
        if source.isdecimal():
            source = int(source)
            if 0 < source < 6:
                source_type = ['png', 'jpg', 'csv', 'json', 'txt'][source-1]
                if source in [1, 2]:
                    target_type = ['jpg', 'png'][source-1]
                elif source == 3:
                    target_type = select_target_type(file_types.get('csv'))
                elif source == 4:
                    target_type = select_target_type(file_types.get('json'))
                elif source == 5:
                    target_type = select_target_type(file_types.get('txt'))
                break
        print('Entered value is not correct.')
        source = input(f'Please select the type of file you want to convert.\n{file_types["from"]}\n')
    return source_type, target_type

def select_target_type(options):
    print_options(options)
    targer = input()
    while True:
        if targer.isdecimal():
            num = int(targer)
            if 0 < num <= len(options):
                target_type = options[num-1]
                break
        print('Entered value is not correct.')
        print_options(options)
        target = input()
    return target_type.lower()

def print_options(options):
    print('Please select the type of target file.')
    for i in range(1, len(options) + 1):
        print(f'{i}. {options[i-1]}')

def convert_picture(file_name, source_type, target_type):
    with open(file_name + '.' + source_type, 'rb') as source:
        with open(file_name + '_masolat.' + target_type, 'wb') as target:
            data = source.read(4096)
            while data:
                target.write(data)
                data = source.read(4096)

def convert_from_json(file_name, target_type):
    with open(file_name + '.json', encoding='utf-8') as jason:
        dict_data = json.load(jason)
        content = dict_to_string(dict_data)
        with open(file_name + '_masolat.' + target_type, 'w') as target:
            target.write(content)

def dict_to_string(dict_data):
    items = dict_data.get('data')
    keys = items[0].keys()
    content = ' '.join(list(keys))
    for item in items:
        row = ''
        for k in keys:
            row += item.get(k) + ' '
        content += '\n' + row[:-1]
    return content

def convert_to_json(file_name, source_type):
    with open(file_name + '.' + source_type, 'r') as source:
        content = source.readlines()
        dict_data = content_to_dict(content)
        with open(file_name + '_masolat.json', 'w') as jason:
            json.dump({"data": dict_data}, jason, indent=2)

def content_to_dict(content):
    dict_data = []
    keys = content[0].split()
    for i in range(len(content)):
        values = content[i].split()
        dic = {}
        for j in range(len(keys)):
            dic[keys[j]] = values[j]
        dict_data.append(dic)
    return dict_data

def convert_non_json(file_name, source_type, target_type):
    with open(file_name + '.' + source_type, 'r') as source, open(file_name + '_masolat.' + target_type, 'w') as targer:
        targer.write(source.read())

def main():
    source_type, target_type = select_files_type()
    file_name = input('Please enter the file name (without extension): \n')
    if source_type in ['png', 'jpg']:
        convert_picture(file_name, source_type, target_type)
    elif source_type == 'json':
        convert_from_json(file_name, target_type)
    elif target_type == 'json':
        convert_to_json(file_name, source_type)
    else:
        convert_non_json(file_name, source_type, target_type)

if __name__ == '__main__':
    main()

# .\source\json_file.json
# .\source\csv_file.csv
# .\source\txt_file.txt

