'''
  This is a hack cuz pyinstaller/flask
  have trouble closing child-processes
'''

import os
import sys
import psutil
import threading

def get_process_id(process_name):
  for proc in psutil.process_iter():
    if process_name == proc.name():
      return proc.pid
  return False

def set_interval(func, sec):
    def func_wrapper():
        set_interval(func, sec)
        func()
    t = threading.Timer(sec, func_wrapper)
    t.start()
    return t

parent_pid = os.getpid()
def check(): 
  if get_process_id('ll-dashboard.exe') == False:
    print('exiting')
    psutil.Process(parent_pid).kill()

if getattr(sys, 'frozen', False) and hasattr(sys, '_MEIPASS'):
  set_interval(check, 10)
