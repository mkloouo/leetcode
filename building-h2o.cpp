#include <condition_variable>
#include <mutex>
#include <functional>
#include <atomic>

class H2O
{
private:
  std::mutex m;
  std::condition_variable cv;
  std::atomic_int hydrogen_released;

public:
  H2O()
  {
  }

  void hydrogen(function<void()> releaseHydrogen)
  {
    std::unique_lock lk(m);
    cv.wait(lk, [&]
            { return this->hydrogen_released < 2; });

    // releaseHydrogen() outputs "H". Do not change or remove this line.
    releaseHydrogen();
    ++hydrogen_released;

    lk.unlock();
    cv.notify_one();
  }

  void oxygen(function<void()> releaseOxygen)
  {
    std::unique_lock lk(m);
    cv.wait(lk, [&]
            { return this->hydrogen_released == 2; });

    // releaseOxygen() outputs "O". Do not change or remove this line.
    releaseOxygen();
    hydrogen_released = 0;

    lk.unlock();
    cv.notify_all();
  }
};
