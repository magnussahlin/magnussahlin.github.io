import pandas as pd
from pyodide.http import open_url

def get_wordlist():
    df = pd.read_csv(open_url("https://raw.githubusercontent.com/iskander-akhmetov/Highly-Language-Independent-Word-Lemmatization-Using-a-Machine-Learning-Classifier/master/DS_lemm/lemmatization-sv.txt"), names=["word", "lemma"], encoding="utf-8", header=0, delim_whitespace=True)

    lemmas = df.drop(df[df['lemma'].map(len) != 5].index)
    lemmas = lemmas.drop_duplicates(subset=['lemma'])
    words = df.drop(df[df['word'].map(len) != 5].index)
    five_list = pd.concat((lemmas.lemma, words.word))
    return five_list

def contains(word_list, letter_list):
    for letter, amount in letter_list:
        print(letter + ' ' + str(amount), end='')
        if amount == 0:
            word_list = word_list[word_list.str.count(str(letter)) == int(amount)]
        else:
            word_list = word_list[word_list.str.count(str(letter)) >= int(amount)]
    print(word_list)
    return word_list

def contains_at(word_list, letter_list):
    for letter, index, amount in letter_list:
        word_list = word_list[(word_list.str[index] == letter) == amount]
    print(word_list)
    return word_list
    
def get_lists():
    color_list = Element('color-element').element.innerText.split(',')
    letter_list = Element('letter-element').element.innerText.split(',')
    contains_list = [(':', 0),('-', 0),('é', 0),('\.', 0)]
    contains_at_list = []
    for i in range(len(color_list)):
        contains_list.append((letter_list[i], int(int(color_list[i]) > 0)))
        contains_at_list.append((letter_list[i], int(i % 5), int(color_list[i]) == 2))
    return contains_list, contains_at_list

def main():
    five_list = get_wordlist()
    contains_list, contains_at_list = get_lists()
    five_list = contains(five_list, contains_list)
    five_list = contains_at(five_list, contains_at_list)
    five_list = five_list.drop_duplicates()
    pyscript.write("right", five_list.to_string(index=False))

def handle_click(e):
    main()