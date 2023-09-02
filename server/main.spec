# -*- mode: python ; coding: utf-8 -*-
from distutils.dir_util import copy_tree
import shutil
import os

block_cipher = None


a = Analysis(
    ['main.py'],
    pathex=[],
    datas=[],
    binaries=[],
    hiddenimports=[],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    win_no_prefer_redirects=False,
    win_private_assemblies=False,
    cipher=block_cipher,
    noarchive=False,
)
pyz = PYZ(a.pure, a.zipped_data, cipher=block_cipher)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.zipfiles,
    a.datas,
    [],
    name='ll-dashboard',
    icon=['../src/public/favicon.ico'],
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    upx_exclude=[],
    runtime_tmpdir=None,
    console=False,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
)

copy_tree("data", "../release/ll-dashboard/data")
copy_tree("../src/.output/public", "../release/ll-dashboard/dist")

os.chdir('../release')
shutil.make_archive('ll-dashboard', 'zip', '.', 'll-dashboard')