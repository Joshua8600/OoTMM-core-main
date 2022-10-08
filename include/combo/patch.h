#ifndef COMBO_PATCH_H
#define COMBO_PATCH_H

#include <combo/types.h>

#define CONCAT2(a, b) a ## b
#define CONCAT(a, b) CONCAT2(a, b)
#define PATCH_FUNC(dst, src)    __attribute__((section(".patch"), used)) static u32 CONCAT(kPatch, __COUNTER__)[] = { 0x6, (u32)dst, (u32)src };

#endif
