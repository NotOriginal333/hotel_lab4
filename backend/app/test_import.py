import sys
import os


def test_import():
    try:
        import app.core
        import app.user
        import app.resort
        print("Modules imported successfully")
    except ImportError as e:
        print(f"Import error: {e}")


if __name__ == "__main__":
    test_import()
