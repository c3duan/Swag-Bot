#if !defined( COMMON_H )
#define COMMON_H

#include <stdio.h>

#define TRACING
#if defined(TRACING)

#define TRACE(msg) printf("   TRACE: %s\n", msg)
#define TRACE_S(msg, s) printf("   TRACE: %s : %s\n", msg, s)
#define TRACE_I(msg, i) printf("   TRACE: %s : %d\n", msg, i)
#define TRACE_CALL printf("-> TRACE: Call::%s\n", __FUNCTION__)
#define TRACE_CALL_I(p1) printf("-> TRACE: Call::%s(%d)\n", __FUNCTION__, p1)
#define TRACE_END printf("<- Call::%s\n", __FUNCTION__)

#else

#define TRACE(msg)
#define TRACE_CALL
#define TRACE_CALL_I(p1)
#define TRACE_END

#endif

#define THROW_TYPE_ERROR( MSG ) \
	return Nan::ThrowTypeError( MSG );

#define CHECK_ARG(I, CHECK, DO_TRUE, DO_FALSE) \
	if ( info.Length() <= (I) || !info[I]->CHECK ) { DO_FALSE; } else { DO_TRUE; }

#define REQUIRE_ARG(I, CHECK) \
	CHECK_ARG( I, CHECK, , THROW_TYPE_ERROR("Argument " #I " must be an object") )

#define REQ_OBJ_ARG(I, VAR) \
	REQUIRE_ARG( I, IsObject() ) \
	Local<Object> VAR = Local<Object>::Cast( info[I] )

#define REQ_INT_ARG(I, VAR) \
	REQUIRE_ARG( I, IsNumber() ) \
	int VAR = info[I]->Int32Value()

#define OPT_INT_ARG(I, VAR, DEFAULT) \
	int VAR; \
	CHECK_ARG( I, IsNumber(), VAR = info[I]->Int32Value(), VAR = DEFAULT )

#define REQ_FUN_ARG(I, VAR)                                      \
  if (info.Length() <= (I) || !info[I]->IsFunction())            \
		return Nan::ThrowTypeError("Argument " #I " must be a function");   \
  Local<Function> VAR = Local<Function>::Cast(info[I]);

#endif
