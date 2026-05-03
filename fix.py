import os
content = open('src/pages/Home.jsx','w')
content.write(open('src/App.jsx').read().replace('App','Home'))
content.close()
print('done')
