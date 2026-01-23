import matplotlib.pyplot as plt
import sys
import json

if (len(sys.argv) < 2):
  print('usage: with argument')
  sys.exit(1)

intervals = []

if (sys.argv[1].endswith('.json') or sys.argv[1].endswith('.txt')):
  with open(sys.argv[1], 'r') as intervals_file:
    intervals = json.load(intervals_file)
else:
  intervals = [*json.loads(sys.argv[1])]

intervals.sort(key=lambda interval: interval[1])

fig, ax = plt.subplots()

for index, value in enumerate(intervals):
  ax.plot([value[0], value[1]], [index, index])

plt.show()

